import { Box, Button, Container, Heading, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import Img from '../assets/1.png';
import LogoImg from '../assets/logo.png';
import Img2 from '../assets/ob2.png';
import Img3 from '../assets/ob3.png';
import Img4 from '../assets/ob4.png';
import { Pagination, Scrollbar, A11y } from 'swiper';
import { useSwiper, Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StartButton = () => {
  const swiper = useSwiper();

  return (
    <Button pos="absolute" bottom="12vh" left="50%" ml="-125px" size="lg" bg="#ED5113" rounded="full" color="white" w={250} py={7} onClick={() => swiper.slideNext()}>
      <svg style={{ width: 20, height: 20, transform: 'translate(-10px)' }} viewBox="0 0 24 24">
        <path fill="white" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
      </svg>
      Get Started
    </Button>
  );
};

const NextButton = () => {
  const swiper = useSwiper();

  return (
    <Button variant="ghost" size="lg" my={20} color="orange.500" onClick={() => swiper.slideNext()}>
      Next
    </Button>
  );
};

const SkipButton = () => {
  const swiper = useSwiper();

  return (
    <Button variant="ghost" size="lg" my={20} color="white" onClick={() => swiper.slideTo(3)}>
      Skip
    </Button>
  );
};

function OnboardingPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  return (
    <>
      <Swiper modules={[Pagination, A11y]} slidesPerView={1} pagination={{ clickable: true }} onSlideChange={(swiper) => setIndex(swiper.activeIndex)}>
        <HStack pos="fixed" display={index > 0 && index < 3 ? 'flex' : 'none'} bottom="-50px" left="50%" transform="translateX(-50%)" maxW={1200} w="100%" zIndex={100}>
          <SkipButton />
          <Spacer />
          <NextButton />
        </HStack>

        <SwiperSlide>
          <Container h="100vh" textAlign="center" py={20} bg="#04113E" p={0}>
            <VStack pt={50} pos="relative" bg="white" h="85vh" borderBottomRadius={40} overflow="hidden">
              <Image src={Img} zIndex={1} />

              <Image as={motion.img} src={LogoImg} w={340} layout layoutId="logo" zIndex={1} />

              <Text zIndex={1} fontWeight="bold">
                Snow problem, we'll handle it.
              </Text>

              <Text pt={50} zIndex={1} px={4} color="gray.600">
                Effortless Snow Clearing. Our user-friendly app offers quick and dependable snow removal services.
              </Text>

              <svg style={{ position: 'absolute', top: 50, left: 10, width: 70, height: 70, zIndex: 10 }} viewBox="0 0 24 24">
                <path fill="#FC7B22" d="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23" />
              </svg>
              <svg style={{ position: 'absolute', top: 250, right: 10, width: 50, height: 50, zIndex: 10 }} viewBox="0 0 24 24">
                <path fill="#FC7B22" d="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23" />
              </svg>
              <svg style={{ position: 'absolute', top: 600, left: 30, width: 30, height: 30, zIndex: 10 }} viewBox="0 0 24 24">
                <path fill="#FC7B22" d="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23" />
              </svg>

              {index === 0 && (
                <>
                  <Box as={motion.div} pos="absolute" top="-70vw" left="-70vw" w="150vw" h="150vw" bg="#FFF1E9" rounded="full" layout layoutId="bg-blob1" />
                  <Box as={motion.div} pos="absolute" bottom="-70vw" right="-70vw" w="150vw" h="150vw" bg="#FFF1E9" rounded="full" layout layoutId="bg-blob2" />
                </>
              )}
            </VStack>

            <StartButton />
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container h="100vh" textAlign="center" py={20} bg="#04113E" p={0}>
            {index === 1 && <Image as={motion.img} pos="absolute" top={10} left="50%" w={200} h={45} ml={-100} src={LogoImg} layout layoutId="logo" zIndex={100} />}
            <VStack pt={100} pos="relative" bg="white" h="85vh" borderBottomRadius={40} overflow="hidden">
              <Image src={Img2} w="90%" zIndex={1} />

              <Text zIndex={1} fontWeight="bold">
                Location-Based Suggestions
              </Text>

              <Text pt={30} zIndex={1} px={4} color="gray.600">
                Just select your location and we'll send a professional snow cleaner to take care of the rest.
              </Text>

              {index === 1 && (
                <>
                  <Box as={motion.div} pos="absolute" top="-50vw" left="-50vw" w="100vw" h="100vw" bg="#FFF1E9" rounded="full" layout layoutId="bg-blob1" />
                  <Box as={motion.div} pos="absolute" bottom="-50vw" right="-50vw" w="100vw" h="100vw" bg="#FFF1E9" rounded="full" layout layoutId="bg-blob2" />
                </>
              )}
            </VStack>
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container h="100vh" textAlign="center" py={20} bg="#04113E" p={0}>
            {index === 2 && <Image as={motion.img} pos="absolute" top={10} left="50%" w={200} h={45} ml={-100} src={LogoImg} layout layoutId="logo" zIndex={100} />}
            <VStack pt={100} pos="relative" bg="white" h="85vh" borderBottomRadius={40} overflow="hidden">
              <Image src={Img3} w="90%" zIndex={1} />

              <Text zIndex={1} fontWeight="bold">
                Quick and Reliable Service
              </Text>

              <Text pt={30} zIndex={1} px={4} color="gray.600">
                Experience seamless snow removal with AI assistance as our app will recommend a nearby cleaner and provide an estimated arrival time for a worry-free winter.
              </Text>

              {index === 2 && (
                <>
                  <Box as={motion.div} pos="absolute" bottom="-50vw" right="-50vw" w="100vw" h="100vw" bg="#FFF1E9" rounded="full" layout layoutId="bg-blob1" />
                  <Box as={motion.div} pos="absolute" top="-60vw" left="-60vw" w="120vw" h="120vw" bg="#FFF1E9" rounded="full" layout layoutId="bg-blob2" />
                </>
              )}
            </VStack>
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container h="100vh" textAlign="center" py={20} bg="#04113E" p={0}>
            {index === 3 && <Image as={motion.img} pos="absolute" top={10} left="50%" w={200} h={45} ml={-100} src={LogoImg} layout layoutId="logo" zIndex={100} />}
            <VStack pt={100} pos="relative" bg="white" h="85vh" borderBottomRadius={40} overflow="hidden">
              <Image src={Img4} w="90%" zIndex={1} />

              <Text zIndex={1} fontWeight="bold">
                That's it!
              </Text>

              <Text pt={30} zIndex={1} px={4} color="gray.600">
                Ready to get started?
              </Text>

              {index === 3 && (
                <>
                  <Box as={motion.div} pos="absolute" bottom="-100vw" right="-100vw" w="170vw" h="170vw" bg="#FFF1E9" rounded="full" layout layoutId="bg-blob1" />
                  <Box as={motion.div} pos="absolute" top="-30vw" left="-30vw" w="140vw" h="140vw" bg="#FFF1E9" rounded="full" layout layoutId="bg-blob2" />
                </>
              )}
            </VStack>

            <Button pos="absolute" bottom="12vh" left="50%" ml="-125px" size="lg" bg="#ED5113" rounded="full" color="white" w={250} py={7} onClick={() => navigate('/map')}>
              <svg style={{ width: 20, height: 20, transform: 'translate(-10px)' }} viewBox="0 0 24 24">
                <path fill="white" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
              Continue
            </Button>
          </Container>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default OnboardingPage;
