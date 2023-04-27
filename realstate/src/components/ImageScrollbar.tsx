import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

const d = ["none", "none", "none", "block"].join(" ");

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
        d={d}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginLeft="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
        d={d}
      />
    </Flex>
  );
};

export default function ImageScrollbar({ images }: any) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{ overflow: "hidden" }}>
      {images.map((image: any) => (
        <Box width="910px" itemId={image.id} overflow="hidden" p="1" key={image.id}>
          <Image
            placeholder="blur"
            blurDataURL={image.url}
            src={image.url}
            width={1000}
            height={500}
            alt="property image"
            sizes="(max-width:500px) 100px, (max-height:1024px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}
