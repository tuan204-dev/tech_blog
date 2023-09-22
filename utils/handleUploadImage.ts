import { v4 as uuidV4 } from 'uuid'
import { storage } from '@/firebase/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default async function handleUploadImage(file: File) {
  if (!file) return
  const fileName = uuidV4()
  const imageRef = ref(storage, `images/${fileName}`)
  const snapshot = await uploadBytes(imageRef, file)
  const url = await getDownloadURL(snapshot.ref)
  return url
}
