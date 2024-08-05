import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
import shortHash from "shorthash2";
import { Blurhash } from "react-native-blurhash";

const CacheImage = (props) => {
  let { source, style, hash } = props;
  let { uri } = source;
  const [imageUri, setImageUri] = useState(null);
  const [imageLoad, setImageLoad] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setImageLoad(true);
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
        console.log("Error fetching image:", error, source);
        setImageUri(uri); // Fallback to original URI if caching fails
      }
    };
    setImageLoad(false);
    fetchImage();
  }, [uri]);

  return (
    <>
      {imageLoad && hash && (
        <Blurhash
          blurhash={hash}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 999,
          }}
        />
      )}
      <Image
        source={{ uri: imageUri }}
        style={style}
        {...props}
        onLoad={() => setImageLoad(false)}
      />
    </>
  );
};

export default CacheImage;
