import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import firebase from '../../firebase'

const useStorage = () => {
  const uploadFile = async (file: any) => {
    const storage = getStorage(firebase)
    const storageRef = ref(storage, uuid())
    const snapshot = await uploadBytes(storageRef, file)
    return await getDownloadURL(snapshot.ref)
  }

  return { uploadFile }
}

export default useStorage
