'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from './UploadForm.module.css';

interface FormValues {
  file: File | null;
}

const validationSchema = Yup.object({
  file: Yup.mixed<File>()
    .required('Photo is required')
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return false;
      return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
    }),
});

async function uploadAvatarApi(file: File) {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch('http://localhost:5000/users/me/avatar', {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to upload image');
  }

  return response.json();
}

export default function UploadForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: () => {
      toast.success('Photo uploaded successfully!');
      router.push('/articles');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const handleCircleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div className={styles.wrapper}>
    <div className={styles.card}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Close"
      >
        <svg className={styles.closeIcon}>
          <use href="/sprite.svg#Controls=close, Type=stroke, Size=32px" />
        </svg>
      </button>

      <h1 className={styles.title}>Upload your photo</h1>

      <Formik<FormValues>
        initialValues={{ file: null }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (values.file) {
            mutation.mutate(values.file);
          }
        }}
      >
        {({ setFieldValue, errors, touched, values }) => {
          const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setFieldValue('file', selectedFile);
              setPreviewUrl(URL.createObjectURL(selectedFile));
            }
          };

          return (
            <Form className={styles.form}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                aria-label="Upload your profile photo"
                className={styles.hiddenInput}
                onChange={handleFileChange}
              />

              <div
                className={`${styles.avatarContainer} ${
                  previewUrl ? styles.avatarContainerFilled : ''
                }`}
                onClick={handleCircleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCircleClick();
                }}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Avatar preview"
                    className={styles.previewImage}
                  />
                ) : (
                  <div className={styles.cameraCircle}>
                    <svg className={styles.cameraIcon}>
                      <use href="/sprite.svg#cameraIcon" />
                    </svg>
                  </div>
                )}
              </div>

              {errors.file && touched.file && (
                <p className={styles.errorMessage}>{errors.file}</p>
              )}

              <button
                type="submit"
                disabled={!values.file || mutation.isPending}
                className={`${styles.saveButton} ${
                  values.file ? styles.saveButtonActive : ''
                }`}
              >
                {mutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </Form>
          );
        }}
      </Formik>
      </div>
      </div>
  );
}
