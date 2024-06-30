import { getStorage, ref, uploadBytes, getDownloadURL, listAll, getMetadata } from 'firebase/storage';

const storage = getStorage();

/*
export async function uploadFile(filePath) {
  const fileRef = ref(storage, 'path/to/upload/file.jpg');
  const fileBlob = await RNFetchBlob.fs.readFile(filePath, 'base64');
  const fileBuffer = Buffer.from(fileBlob, 'base64');
  await uploadBytes(fileRef, fileBuffer);
  console.log('File uploaded to Firebase Storage!');
} */

export async function getFileDownloadURL(filePath) {
  const fileRef = ref(storage, filePath);
  const url = await getDownloadURL(fileRef);
  console.log('Download URL:', url);
  return url;
}

export async function getPdfsDownloadURLs(folderPath) {
    try {
        const folderRef = ref(storage, folderPath);
        const listResult = await listAll(folderRef);

        const downloadURLs = await Promise.all(
            listResult.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                const title = itemRef.name;

                return {
                    url: url,
                    title: title,
                };
            })
        );

        console.log('Download URLs:', downloadURLs);
        return downloadURLs;
    } catch (error) {
        console.error('Failed to get download URLS:', error);
        return [];
    }
}

