import React from 'react';
import ImageUploader from 'react-images-upload';

import * as css from './FileUploader.css';

interface Props {
  onChange: (picture: File[]) => void;
}

export default function FileUploader({ onChange }: Props): JSX.Element {
  console.log(css);
  return (
    <ImageUploader
      withIcon={false}
      withPreview
      buttonText="Kép feltöltése"
      onChange={onChange}
      imgExtension={['.jpg', '.gif', '.png']}
      fileContainerStyle={{
        padding: 0,
      }}
      buttonStyles={{
        color: 'red',
      }}
      label="Kiterjesztés: .jpg, .png vagy .gif"
    />
  );
}
