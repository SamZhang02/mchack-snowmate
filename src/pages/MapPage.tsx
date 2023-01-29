import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Container, Text, Image, Box, HStack, VStack, Input, Spacer, Heading, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor, Button, Divider, Progress, chakra, InputGroup, InputLeftElement, Spinner } from '@chakra-ui/react';
import Img1 from '../assets/1.png';
import Img2 from '../assets/4.png';
import Img3 from '../assets/2.png';
import Img4 from '../assets/3.png';
import LogoImg from '../assets/logo.png';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { faker } from '@faker-js/faker';
import Sheet from 'react-modal-sheet';
import { SwiperProps, Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y } from 'swiper';
import { motion } from 'framer-motion';
import { SessionToken } from '@mapbox/search-js-core';
import { useMapboxAutofill } from '@mapbox/search-js-react';

mapboxgl.accessToken = 'pk.eyJ1Ijoieml2c3RldmUiLCJhIjoiY2tsMnhldGRvMDh4OTJvbGF2OTZ3OWV4MCJ9.jOR37XTSsw5NtfCL96gFlw';

const NativeSheet = chakra(Sheet);
const sessionToken = new SessionToken();
const PRICES = [15, 25, 50, 30];

function MapPage() {
  const autofill = useMapboxAutofill({ accessToken: mapboxgl.accessToken });
  const [search, setSearch] = useState('');
  const [autofillResults, setAutofillResults] = useState<any[]>([]);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const selfMarker = useRef<HTMLDivElement | null>(null);
  const personMarker = useRef<HTMLDivElement | null>(null);
  const [person, setPerson] = useState({
    name: faker.name.firstName(),
    image: faker.image.avatar(),
    reviews: Math.floor(Math.random() * (10 - 6 + 1) + 6) / 2,
    time: Math.floor(Math.random() * (15 - 8 + 1) + 8),
  });
  const [lng, setLng] = useState(-73);
  const [lat, setLat] = useState(45);
  const [lng2, setLng2] = useState(0);
  const [lat2, setLat2] = useState(0);
  const [zoom, setZoom] = useState(16);
  const [pitch, setPitch] = useState(20);

  const sheetRef = useRef<any>();
  const [swiper, setSwiper] = useState<SwiperProps>();
  const [index, setIndex] = useState(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);

  useEffect(() => {
    if (map.current) {
      return;
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // @ts-ignore
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          interactive: false,
          profile: 'mapbox/driving',
        });

        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/zivsteve/cldgesfnx002501rwaoxd2o4p',
          center: [lng, lat],
          zoom,
          pitch,
        });
        selfMarker.current!.style.opacity = '1';
        const ln2 = position.coords.longitude - Math.random() / 100;
        const lt2 = position.coords.latitude - Math.random() / 100;

        new mapboxgl.Marker(personMarker.current!).setLngLat([ln2, lt2]).addTo(map.current!);
        new mapboxgl.Marker(selfMarker.current!).setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current!);

        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
        setLng2(ln2);
        setLat2(lt2);
        map.current!.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          pitch,
          essential: true,
        });

        directions.setOrigin([position.coords.longitude, position.coords.latitude]);
        directions.setDestination([ln2, lt2]);
        map.current?.addControl(directions, 'top-left');

        map.current.on('style.load', () => {
          const layers = map.current?.getStyle().layers;
          // @ts-ignore
          const labelLayerId = layers.find((layer) => layer?.type === 'symbol' && layer?.layout?.['text-field']).id;

          map.current?.addLayer(
            {
              id: 'add-3d-buildings',
              source: 'composite',
              'source-layer': 'building',
              filter: ['==', 'extrude', 'true'],
              type: 'fill-extrusion',
              minzoom: 25,
              paint: {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
                'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
                'fill-extrusion-opacity': 0.6,
              },
            },
            labelLayerId
          );
        });
      });
    }
  }, []);

  const loadAutocomplete = useCallback(async () => {
    const res = await autofill.suggest(search, { sessionToken });
    setAutofillResults(res.suggestions);
  }, [search]);

  useEffect(() => {
    loadAutocomplete();
  }, [search]);

  const changeLocation = useCallback(async (item: any) => {
    const res = await autofill.retrieve(item, { sessionToken });
    const newLng = res.features[0].geometry.coordinates[0];
    const newLat = res.features[0].geometry.coordinates[1];
    setLng(newLng);
    setLat(newLat);
    new mapboxgl.Marker(selfMarker.current!).setLngLat([newLng, newLat]).addTo(map.current!);
    map.current!.flyTo({
      center: [newLng, newLat],
      pitch,
      essential: true,
    });
    setSearch('');
  }, []);

  const imgs = [Img1, Img2, Img3, Img4];

  return (
    <Container maxW="full" w="100vw" h="100vh" p={0} overflow="hidden">
      <Image pos="fixed" top={3} left="50%" w={150} transform="translateX(-50%)" src={LogoImg} zIndex={100} />
      <Box
        pos="fixed"
        bottom={{ base: 230, lg: 10 }}
        right={3}
        bg="white"
        p={3}
        rounded="full"
        zIndex={10}
        boxShadow="0px 0px 20px 2px #999"
        cursor="pointer"
        onClick={() => {
          map.current!.flyTo({
            center: [lng, lat],
            essential: true,
          });
        }}
      >
        <svg style={{ width: 28, height: 28 }} viewBox="0 0 24 24">
          <path fill="#222" d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
        </svg>
      </Box>

      <Box ref={selfMarker} className="self-marker" opacity={0} />
      <Popover trigger="hover">
        <PopoverTrigger>
          <Box ref={personMarker} display={index === 2 && !loadingRoute ? 'block' : 'none'} w="50px" h="50px" rounded="full" overflow="hidden" border="5px solid #2A86CC">
            <Image src={person.image} w="100%" h="100%" />
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{person.name}</PopoverHeader>
          <PopoverBody>Hello sir, my name is {person.name}</PopoverBody>
        </PopoverContent>
      </Popover>
      <Box ref={mapContainer} pos="absolute" top={0} left={0} w="100%" h="100%" />

      <NativeSheet ref={sheetRef} maxW={index === 1 ? 600 : 450} w="100%" m={{ base: 0, lg: index === 2 ? '50px 40px' : '50px 200px' }} borderRadius={20} transition="width 0.3s ease-in-out, margin 0.3s ease-in-out" isOpen={true} snapPoints={[800, 500, 200]} initialSnap={2} onClose={() => {}}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {index === 0 && (
              <VStack maxW={450} w="100%" p={5} spacing={3} pb={100}>
                <Heading fontSize={26} textAlign="center">
                  Need a snow removal?
                </Heading>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <svg style={{ width: 21, height: 21 }} viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    }
                  />
                  <Input as={motion.input} w="100%" autoComplete="street-address" variant="filled" placeholder="Add a location" layoutId="search" onFocus={() => sheetRef.current!.snapTo(0)} value={search} onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
                <VStack opacity={search ? 1 : 0} pos="absolute" top="100px" w="95%" zIndex={200} bg="white" p={5} rounded="2xl" shadow="xl">
                  {autofillResults.map((item) => (
                    <Box as="div" key={item.full_address} fontWeight="bold" border="1px solid #eee" p={1} cursor="pointer" transition="0.5s linear" _hover={{ bg: '#eee' }} onClick={() => changeLocation(item)}>
                      {item.full_address}
                    </Box>
                  ))}
                </VStack>
                <Button
                  as={motion.button}
                  size="xs"
                  alignSelf="flex-start"
                  layoutId="date"
                  fontSize={13}
                  leftIcon={
                    <svg style={{ width: 19, height: 19 }} viewBox="0 0 24 24">
                      <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                    </svg>
                  }
                >
                  Now
                </Button>

                <Heading as={motion.div} fontSize={16} textAlign="left" layout layoutId="heading" color="gray.600">
                  Select one or multiple services below.
                </Heading>

                {['Car Cleaning', 'Steps', 'Driveway', 'Sidewalk'].map((item, i) => (
                  <HStack
                    key={item}
                    minW={350}
                    h={120}
                    spacing={8}
                    bg="rgba(255, 255, 255, 0.7)"
                    borderColor={selectedServices.includes(i) ? '#2A86CC' : '#ededed'}
                    _hover={{ bg: '#fafafa', transform: 'scale(1.01)' }}
                    cursor="pointer"
                    transition="0.3s ease-in-out"
                    backdropFilter="blur(5px)"
                    rounded="xl"
                    borderWidth="3px"
                    onClick={() => {
                      const newSelectedServices = [...selectedServices];
                      if (newSelectedServices.includes(i)) {
                        setSelectedServices(newSelectedServices.filter((s) => s !== i));
                        return;
                      }
                      newSelectedServices.push(i);
                      setSelectedServices(newSelectedServices);
                    }}
                  >
                    <Box w={selectedServices.includes(i) ? 30 : 0} h="100%" bg="#2A86CC"></Box>
                    <Box pos="relative" h="100%">
                      <Image as={motion.img} src={imgs[Math.min(i, 3)]} w={150} h="100%" layout layoutId={`img-${i}`} />
                    </Box>
                    <VStack align="space-between" spacing={0}>
                      <Text as={motion.div} fontWeight="bold" fontSize={18} layout layoutId={`title-${i}`}>
                        {item}
                      </Text>
                      <Text fontWeight="bold" fontSize={14} opacity={0.5}>
                        For everyday, affordable teeth cleaning
                      </Text>
                      <HStack opacity={0.7}>
                        <Text fontWeight="bold" fontSize={18}>
                          CA${PRICES[i]}
                        </Text>
                        <Text fontWeight="bold" fontSize={22}>
                          {'›'}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                ))}
                <Button pos="absolute" w="90%" py={6} bottom={5} bg="#154163" color="white" onClick={() => setIndex(1)}>
                  Continue
                </Button>
              </VStack>
            )}
            {index === 1 && (
              <VStack align="flex-start" px={5}>
                <Button onClick={() => setIndex(0)} bg="#f3f3f3">
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path fill="#222" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                  </svg>
                </Button>

                <HStack pt={5} w="100%" align="center" justify="space-between">
                  <Heading fontSize={23} textAlign="center">
                    Snow Removal
                  </Heading>
                  <Heading fontSize={21} textAlign="center">
                    CA${selectedServices.reduce((partialSum, a) => partialSum + PRICES[a], 0)}
                  </Heading>
                </HStack>
                <Text color="gray.500">
                  In {person.time} mins, {new Date(new Date().getTime() + person.time * 60000).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}
                </Text>
                <Divider />

                <VStack w="100%" pt={10} pb={100} align="flex-start" spacing={0}>
                  {selectedServices
                    .sort((a, b) => a - b)
                    .map((item) => (
                      <HStack key={item} w="100%" spacing={3} align="center" justify="flex-start">
                        <Image as={motion.img} src={imgs[Math.min(item, 3)]} w="50px" h="50px" rounded="full" layout layoutId={`img-${item}`} />
                        <Text as={motion.div} fontWeight="bold" layout layoutId={`title-${item}`}>
                          {['Car Cleaning', 'Steps', 'Driveway', 'Sidewalk'][item]} x 1
                        </Text>
                        <Spacer />
                        <Text>CA${PRICES[item]}</Text>
                      </HStack>
                    ))}
                </VStack>

                <Button w="100%" py={6} bg="#000" color="white" leftIcon={<Image w="20px" h="20px" src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" />}>
                  Pay
                </Button>
                <Button w="100%" py={6} bg="#000" color="white" leftIcon={<Image w="20px" h="20px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" filter="brightness(0) invert(1)" />}>
                  Pay
                </Button>
                <Button w="100%" py={6} bg="#000" color="white" leftIcon={<Image w="20px" h="20px" src="https://cdn-icons-png.flaticon.com/512/62/62780.png" filter="brightness(0) invert(1)" />}>
                  Credit / Debit Card
                </Button>

                <Button
                  pos="absolute"
                  w="90%"
                  py={6}
                  bottom={5}
                  left="50%"
                  transform="translateX(-50%)"
                  bg="#154163"
                  color="white"
                  onClick={() => {
                    setIndex(2);
                    setPerson({
                      name: faker.name.firstName(),
                      image: faker.image.avatar(),
                      reviews: Math.floor(Math.random() * (10 - 6 + 1) + 6) / 2,
                      time: Math.floor(Math.random() * (15 - 8 + 1) + 8),
                    });
                    sheetRef.current!.snapTo(2);
                    setLoadingRoute(true);

                    setTimeout(() => {
                      const el = document.querySelector('#mapbox-directions-profile-cycling') as HTMLElement;
                      el.click();
                      setLoadingRoute(false);
                    }, 10000);
                  }}
                >
                  Proceed
                </Button>
              </VStack>
            )}
            {index === 2 && (
              <VStack h="100%" align="flex-start" px={5}>
                {loadingRoute ? (
                  <VStack w="100%" h={150} align="center" justify="center">
                    <Spinner size="lg" colorScheme="orange" />
                    <Text fontWeight="bold">Matching you with a snow mate...</Text>
                  </VStack>
                ) : (
                  <>
                    <VStack pos="absolute" top={2} right={3} spacing={0} align="flex-end">
                      <Text color="gray.500" fontSize={16} fontWeight="bold" lineHeight={1}>
                        ETA
                      </Text>
                      <Text fontWeight="bold" fontSize={23}>
                        {new Date(new Date().getTime() + person.time * 60000).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}
                      </Text>
                    </VStack>
                    <HStack w="100%" align="center">
                      <Image src={person.image} w="70px" h="70px" rounded="full" bg="#eee" />
                      <VStack>
                        <Heading fontSize={23} textAlign="center">
                          {person.name}
                        </Heading>
                        <HStack>
                          {Array(5)
                            .fill('')
                            .map((_, i) => (
                              <Box w="8px" h="8px" bg={i + 1 < person.reviews ? 'orange' : 'gray.300'} rounded="full" />
                            ))}
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text color="gray.500">Arriving in {person.time} mins</Text>
                    <Progress w="100%" size="sm" colorScheme="orange" isIndeterminate bg="gray.300" />

                    <HStack w="100%" py={5}>
                      <Button
                        flex={1}
                        leftIcon={
                          <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                            <path fill="#222" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                          </svg>
                        }
                      >
                        Call
                      </Button>
                      <Button
                        flex={1}
                        leftIcon={
                          <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                            <path fill="#222" d="M22 7V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.9 2.9 2 4 2H14.1C14 2.3 14 2.7 14 3C14 5.8 16.2 8 19 8C20.1 8 21.2 7.6 22 7M16 3C16 4.7 17.3 6 19 6S22 4.7 22 3 20.7 0 19 0 16 1.3 16 3Z" />
                          </svg>
                        }
                      >
                        Message
                      </Button>
                    </HStack>

                    <VStack w="100%" pt={10} pb={100} align="flex-start" spacing={0}>
                      {selectedServices
                        .sort((a, b) => a - b)
                        .map((item) => (
                          <HStack key={item} w="100%" spacing={3} align="center" justify="flex-start">
                            <Image as={motion.img} src={imgs[Math.min(item, 3)]} w="50px" h="50px" rounded="full" layout layoutId={`img-${item}`} />
                            <Text as={motion.div} fontWeight="bold" layout layoutId={`title-${item}`}>
                              {['Car Cleaning', 'Steps', 'Driveway', 'Sidewalk'][item]}
                            </Text>
                            <Spacer />
                            <Text>CA${PRICES[item]}</Text>
                          </HStack>
                        ))}
                    </VStack>

                    <Button pos="absolute" w="90%" py={6} bottom={5} left="50%" transform="translateX(-50%)" bg="#154163" color="white" onClick={() => setIndex(1)}>
                      Cancel
                    </Button>
                  </>
                )}
              </VStack>
            )}
          </Sheet.Content>
        </Sheet.Container>
      </NativeSheet>
    </Container>
  );
}

export default MapPage;
