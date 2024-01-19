import { ChangeEvent, useState } from 'react';
import './App.css';

type TImageObject = {
  advertId: number;
  imageName: string;
  convertedImage: string;
}

function App() {
  const [images, setImages] = useState<TImageObject[]>([]);

  const converterImagem = (files: FileList | null) => {
    if (!files) {
      console.log('Nenhum arquivo selecionado!');
      return;
    }

    let idForObject = 0;
    const imageObj: TImageObject[] = [];

    for (const file of Array.from(files)) {
      const fileReader = new FileReader();

      const nameOfImage = file.name;

      fileReader.onload = async (loadedFile) => {
        const imageInBase64 = loadedFile.target?.result as string;

        imageObj.push({ advertId: idForObject + 1, imageName: nameOfImage, convertedImage: imageInBase64 });

        idForObject++;
      };

      fileReader.readAsDataURL(file);
    }

    console.log("🚀 ~ converterImagem ~ imageObj:", imageObj);

    setImages(imageObj);
  };

  console.log(images)

  return (
    <div className='app'>
      <h1>Convertendo arquivos de imagem em base64</h1>

      <div className='input'>
        <label htmlFor="file">Escolha um arquivo de imagem</label>

        <input
          name='file'
          type="file"
          accept='image/*'
          onChange={(e: ChangeEvent<HTMLInputElement>) => converterImagem(e.target.files)}
          multiple
        />

        <div className='galery'>
          {
            images.map((image) => {
              return (
                <>
                  <img
                    className='image'
                    src={image.convertedImage}
                    alt={image.imageName}
                    draggable={false}
                  />
                </>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
