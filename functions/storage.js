import { getStorage, ref, uploadBytes, getDownloadURL, listAll, getMetadata } from 'firebase/storage';
import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
//import RNFetchBlob from 'rn-fetch-blob';

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
                const image = getPdfImage(url);

                return {
                    url: url,
                    title: title,
                    image: image,
                };
            })
        );

        //console.log('Download URLs:', downloadURLs);
        return downloadURLs;
    } catch (error) {
        console.error('Failed to get download URLS:', error);
        return [];
    }
}

export async function getPdfImage(pdfURL) {
    const pdfDoc = await PDFDocument.load(pdfURL);

    const page1 = await pdfDoc.getPage(1);

    const page1Image = await page1.render({
        width: page1.width * 2,
        height: page1.height * 2,
        background: '#ffffff',
    });

    console.log('Image Format:', typeof page1Image);

    return page1Image;
}

