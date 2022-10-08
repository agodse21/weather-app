import {
  Button,
  Grid,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
// import { Text } from '@chakra-ui/react/dist'
import React, { useEffect, useState } from "react";
import { RepeatIcon, Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  get7daysWeather,
  getLocation,
  getMap,
  getWeather,
  getWeatherOncurrentLocation,
  refreshPage,
} from "../Redux/action";
import "../App.css";
import { Forecast, ForecastBox } from "./Forecast";
import { Loading } from "./Loading";
import { REQUEST_OF_DATA } from "../Redux/actionTypes";

export const Weather = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { map, forecast,isLoading,  error,langitude, weatherData, currentLocation, latitude } =
    useSelector((state) => {
      return {
        map: state.map,
        isLoading:state.isLoading,
        langitude: state.langitude,
        weatherData: state.weatherData,
        latitude: state.latitude,
        forecast: state.forecast,
        currentLocation: state.currentLocation,
        error:state.error
      };
    });
console.log(isLoading)
  const [city, setCity] = useState("");

  const [isRotate, setIsRotate] = useState(false);

  const onclickWeather = () => {
    if (city == "") {
      toast({
        title: "City name is empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch(getWeather(city));
      setCity("")
    }
  };
  useEffect(() => {
    dispatch({type:REQUEST_OF_DATA})
    dispatch(getLocation());
  }, [dispatch]);

  const handleSyncData = () => {
    setIsRotate(true);
    dispatch(getWeatherOncurrentLocation(latitude, langitude));
  };
  if(error){
    // console.log(error.response.statusText)
    toast({
      title:`${error.response.statusText}`  ,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  if(isLoading){
    return <Loading />
  }
  return(
    <> <Box >
      <Box
        // h={"80px"}
        bg="#F0E3FF">
      <SimpleGrid
       
        columns={[1,1,2]}
      m="auto"
      w="70%"
      
      >
        <Heading mt={5}  textAlign={"center"} color={"#3E206D"} fontFamily="poppins" size={"xl"}>
          Weather forecast
        </Heading>
        <Box  mb={5} mt={5} w="100%">
          <Flex justifyContent={"center"} >
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              style={{
                width: "100%",
                height: "45px",
                border: "2px solid #3E206D",
                padding: "5px",
                borderRadius: "10px",
              }}
              variant={"outline"}
              placeholder="City"
            />
            <Button
              onClick={onclickWeather}
              ml={1}
              h="45px"
              borderRadius={10}
              bg="#3E206D"
              _hover={{ bg: "white", color: "#3E206D" }}
            >
              <Search2Icon
                _hover={{ color: "#3E206D" }}
                color={"white"}
                boxSize={6}
              />
            </Button>
          </Flex>
        </Box>
      </SimpleGrid>

      </Box>
     
      <SimpleGrid w="95%" m="auto" mt={7}  columns={[1,2,2,3]}  spacing={10}>
        <Box
          w="100%"
          p={10}
          color={"#3E206D"}
          borderRadius={25}
          boxShadow="dark-lg"
          className="box"
          h={"300px"}
          textAlign="center"
        >
          <Flex mt={-5} mr={-5} justifyContent={"right"}>
            <RepeatIcon
              className={isRotate ? "iconRotate" : undefined}
              onAnimationEnd={() => {
                setIsRotate(false);
              }}
              cursor={"pointer"}
              onClick={handleSyncData}
              boxSize={8}
            />
          </Flex>

          <Heading textAlign={"center"} fontFamily="poppins">
            {weatherData && weatherData.name}
          </Heading>

          <Heading
            mt={5}
            textAlign={"center"}
            size={["4xl","3xl","4xl"]}
            fontFamily="poppins"
          >
            {Math.round(weatherData?.main?.temp) - 273}&deg;C
          </Heading>

          <Heading mt={5} textAlign={"center"} size={"xl"} fontFamily="poppins">
            {weatherData && weatherData?.weather?.map((item) => item.main)}
          </Heading>
        </Box>
        <Box
        h={"300px"}
          fontFamily="poppins"
          color={"#3E206D"}
          w="100%"
          className="box"
          borderRadius={25}
          boxShadow="dark-lg"
        >
          <Flex p="8px 8px" h="100%">
            {" "}
            <VStack
              // p="15px"
              // pl="50px"
              spacing={5}
              align={"center"}
              w="50%"
              bg={"#3E206D"}
              color="white"
              fontFamily="poppins"
              borderRadius={25}
              h="100%"
            >
              <Text mt={5}>Felt Temp.</Text>
              <Text>Humidity</Text>
              <Text>Wind</Text>
              <Text>Visibility</Text>
              <Text>Max Temp.</Text>
              <Text>Min Temp.</Text>
            </VStack>
            <VStack
              ml={10}
              h="100%"
              fontFamily="poppins"
              w="40%"
              align={"left"}
              // p="15px"
              // pl="50px"
              fontWeight="bold"
              spacing={5}
            >
              <Text mt={5}>
                {(weatherData && weatherData?.main?.feels_like - 273).toFixed(
                  2
                )}
                &deg;C
              </Text>
              <Text>{weatherData && weatherData?.main?.humidity}%</Text>
              <Text>
                {(weatherData && weatherData?.wind?.speed * 3.6).toFixed(2)}{" "}
                Km/h
              </Text>
              <Text>
                {(weatherData && weatherData?.visibility * 0.001).toFixed(2)} Km
              </Text>
              <Text>
                {(weatherData && weatherData?.main?.temp_max - 273).toFixed(2)}
                &deg;C
              </Text>
              <Text>
                {(weatherData && weatherData?.main?.temp_min - 273).toFixed(2)}
                &deg;C
              </Text>
            </VStack>
          </Flex>
        </Box>
        <Box h={"300px"} className="box" borderRadius={25} boxShadow="dark-lg" w="100%">
          {" "}
          <iframe
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "25px",
              fontFamily: "poppins",
            }}
            src={map}
          ></iframe>
        </Box>
      </SimpleGrid>
     
    </Box>
     <SimpleGrid columns={[2,3,4,8]} spacing={6} p={5} mt={7}>
     {forecast &&
       forecast.map((item, i) => <ForecastBox key={i} data={item} />)}
   </SimpleGrid>

   <Text textAlign={"center"} color={"#3E206D"} fontWeight="bold" mb={2}>
     © Made by Amol Godse
   </Text>
   </>
  );
};
