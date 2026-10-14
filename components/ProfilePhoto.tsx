'use client';

import {useEffect, useState} from 'react';
import styles from './Editorial.module.css';

const photos = ['/profile/portrait-car.png', '/profile/portrait-waterfront.png'];
// Keep the same selection during client-side navigation; reloads choose again.
let visitPhoto: string | undefined;

export default function ProfilePhoto() {
  const [photo, setPhoto] = useState<string>();
  useEffect(() => {
    visitPhoto ??= photos[Math.floor(Math.random() * photos.length)];
    setPhoto(visitPhoto);
  }, []);
  return <div className={styles.photo}>
    {photo && <img src={photo} alt="杨静雯的生活照片" width={200} height={200}/>}
  </div>;
}
