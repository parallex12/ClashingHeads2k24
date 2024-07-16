import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import shortHash from "shorthash2";

const CacheImage = (props) => {
  let { source, style } = props;
  let { uri } = source;
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        let hashImg = shortHash(uri);
        const cacheDir = FileSystem.cacheDirectory + "images/";
        const imagePath = cacheDir + hashImg;

        // Ensure the cache directory exists
        const dirInfo = await FileSystem.getInfoAsync(cacheDir);
        if (!dirInfo.exists) {

          await FileSystem.makeDirectoryAsync(cacheDir, {
            intermediates: true,
          });
        }

        // Check if the image is already cached
        const fileInfo = await FileSystem.getInfoAsync(imagePath);
        if (fileInfo.exists) {

          setImageUri(imagePath);
        } else {

          // Download the image to cache directory
          const { uri: localUri } = await FileSystem.downloadAsync(
            uri,
            imagePath
          );
          setImageUri(localUri);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUri(uri); // Fallback to original URI if caching fails
      }
    };

    fetchImage();
  }, [uri]);

  return <Image source={{ uri: imageUri }} style={style} {...props} />;
};

export default CacheImage;
