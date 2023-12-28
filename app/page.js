"use client";

import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { CircularProgress, CircularProgressLabel, Flex, Box, Button, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react";

export default function Home() {
  const nutritionData = [
    {
      id: 1,
      name: 'Phở bò',
      calories: 380
    },
    {
      id: 2,
      name: 'Phở gà',
      calories: 420
    },
  ]

  const { isOpen, onOpen, onClose} = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [ateCalories, setAteCalories] = useState(0)
  const [inputCalories, setInputCalories] = useState('')
  const [inputName, setInputName] = useState('')

  const handleItemClick = (calories) => {
    // Update the ateCalories by adding the calories of the clicked item
    setAteCalories((ateCalories + calories));
    console.log((ateCalories + calories) / 2900 * 100)
  }

  const handleCreateItem = () => {
    console.log(inputName)
    console.log(inputCalories)
  }

  const handleInputCalories = (e) => {
    setInputCalories(e.target.value)
  }

  const handleInputName = (e) => {
    setInputName(e.target.value)
  }

  return (
    <Flex bgColor={'#1C6758'} style={{height: '100vh', width: '100vw'}} alignItems='center' justifyContent='center' color={'#EEF2E6'} flexDirection={'column'}>
      <Box position={'absolute'} fontSize={'2.5rem'} top={'20px'}>Mục tiêu hàng ngày</Box>
      <CircularProgress value={(ateCalories) / 2900 * 100} capIsRound='true' size={450} trackColor="#EEF2E6" color="#D6CDA4">
        <CircularProgressLabel>
          Diet
        </CircularProgressLabel>
      </CircularProgress>
      <Flex position={'absolute'} right={0} bgColor={'#3D8361'} width={'20vw'} height={'100vh'} borderLeftRadius={15} flexDirection={'column'} alignItems={'center'} boxShadow={'2xl'} justifyContent={'space-between'}>
        <Flex flexDirection={'column'} w={'100%'} alignItems={'center'} overflow={'auto'}>
          {nutritionData.map((item) => {
            return (
              <Button size='lg' key={item.id} fontSize={'1.4rem'} mt='30' color='#EEF2E6' bgColor={'#1C6758'} w='90%' py={10} onClick={() => handleItemClick(item.calories)}>
                {item.name}
              </Button>
            )
          })}
        </Flex>
        <IconButton onClick={onOpen} w={'100%'} py={7} bgColor={'#EEF2E6'} aria-label="Add Item" icon={<AddIcon size={4}/>}/>
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        bgColor='#EEF2E6'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Thêm món ăn vào danh sách</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Tên món ăn</FormLabel>
                <Input ref={initialRef} placeholder='Tên món ăn' focusBorderColor="#D6CDA4" onChange={handleInputName}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Số calories</FormLabel>
                <Input placeholder='Calories' focusBorderColor="#D6CDA4" onChange={handleInputCalories}/>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleCreateItem} bgColor='#D6CDA4' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
}