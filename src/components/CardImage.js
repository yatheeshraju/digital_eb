import { Image } from "react-konva";
import useImage from "use-image";
export const CardImage = ({ imgurl }) => {
  const [image] = useImage(imgurl);
  return (
    <Image
      image={image}
      width={300}
      height={200}
      perfectDrawEnabled={false}
      listening={false}
    />
  );
};
