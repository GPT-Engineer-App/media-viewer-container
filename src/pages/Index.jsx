import React, { useState } from "react";
import { Box, Flex, Image, Button, Menu, MenuButton, MenuList, MenuItem, IconButton, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useToast } from "@chakra-ui/react";
import { FaBars, FaPlus, FaEdit, FaTrash, FaCode } from "react-icons/fa";

const MediaViewer = () => {
  const [layout, setLayout] = useState("default");
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      type: "image",
      src: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydHxlbnwwfHx8fDE3MTE5NDE0MDJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
      versions: [
        { id: 1, name: "Original" },
        { id: 2, name: "Edited" },
      ],
    },
    {
      id: 2,
      type: "image",
      src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGFydHxlbnwwfHx8fDE2ODYyNDk4NTN8MA&ixlib=rb-4.0.3&q=80&w=1080",
      versions: [
        { id: 1, name: "Original" },
        { id: 2, name: "Grayscale" },
        { id: 3, name: "Inverted" },
      ],
    },
    {
      id: 3,
      type: "image",
      src: "https://images.unsplash.com/photo-1579783483458-83d02161294e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGFydHxlbnwwfHx8fDE2ODYyNDk4NTN8MA&ixlib=rb-4.0.3&q=80&w=1080",
      versions: [
        { id: 1, name: "Original" },
        { id: 2, name: "Saturated" },
      ],
    },
  ]);
  const [currentItem, setCurrentItem] = useState(mediaItems[0]);
  const [currentVersion, setCurrentVersion] = useState(currentItem.versions[0]);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const toast = useToast();

  const loadMedia = (item) => {
    // Generic load function for media item
    console.log(`Loading media item: ${item.id}`);
  };

  const renderMedia = (item) => {
    // Generic render function for media item
    switch (item.type) {
      case "image":
        return <Image src={item.src} alt="Media" objectFit="contain" />;
      case "video":
        return <video src={item.src} controls />;
      default:
        return null;
    }
  };

  const handleAction = (action) => {
    // Handle action menu item click
    console.log(`Performing action: ${action}`);
  };

  const handleVersionChange = (version) => {
    setCurrentVersion(version);
  };

  const handleCreateItem = () => {
    onModalOpen();
  };

  const handleEditItem = () => {
    onModalOpen();
  };

  const handleDeleteItem = () => {
    // Delete current media item
    const updatedItems = mediaItems.filter((item) => item.id !== currentItem.id);
    setMediaItems(updatedItems);
    setCurrentItem(updatedItems[0]);
    setCurrentVersion(updatedItems[0].versions[0]);
    toast({
      title: "Media item deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleForkItem = () => {
    // Fork current media item
    const forkedItem = { ...currentItem, id: Date.now(), versions: [{ ...currentVersion, id: Date.now() }] };
    setMediaItems([...mediaItems, forkedItem]);
    setCurrentItem(forkedItem);
    setCurrentVersion(forkedItem.versions[0]);
    toast({
      title: "Media item forked",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleMergeVersions = () => {
    // Merge selected versions
    console.log("Merging versions");
  };

  return (
    <Flex direction="column" h="100vh">
      <Flex bg="gray.100" p={4} justifyContent="space-between" alignItems="center">
        <Box>
          <Menu>
            <MenuButton as={IconButton} icon={<FaBars />} variant="outline" />
            <MenuList>
              <MenuItem onClick={() => setLayout("default")}>Default Layout</MenuItem>
              <MenuItem onClick={() => setLayout("sidebar-left")}>Left Sidebar</MenuItem>
              <MenuItem onClick={() => setLayout("sidebar-right")}>Right Sidebar</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Text fontWeight="bold">Media Viewer</Text>
        <Box>
          <Button leftIcon={<FaPlus />} onClick={handleCreateItem}>
            Create
          </Button>
        </Box>
      </Flex>
      <Flex flex={1} overflow="hidden">
        {layout === "sidebar-left" && (
          <Box w="200px" bg="gray.200" p={4}>
            Left Sidebar
          </Box>
        )}
        <Flex direction="column" flex={1}>
          <Box flex={1} p={4}>
            <Flex justifyContent="center" alignItems="center" h="100%">
              {renderMedia(currentItem)}
            </Flex>
          </Box>
          <Flex p={4} overflowX="auto">
            {mediaItems.map((item) => (
              <Box key={item.id} w="100px" h="100px" bg="gray.200" mr={2} cursor="pointer" onClick={() => setCurrentItem(item)}>
                <Image src={item.src} alt="Preview" objectFit="cover" w="100%" h="100%" />
              </Box>
            ))}
          </Flex>
          <Flex bg="gray.100" p={4} justifyContent="space-between" alignItems="center">
            <Box>
              <Menu>
                <MenuButton as={Button} rightIcon={<FaBars />}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FaEdit />} onClick={handleEditItem}>
                    Edit
                  </MenuItem>
                  <MenuItem icon={<FaTrash />} onClick={handleDeleteItem}>
                    Delete
                  </MenuItem>
                  <MenuItem icon={<FaCode />} onClick={handleForkItem}>
                    Fork
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              <Text>Version: {currentVersion.name}</Text>
            </Box>
            <Box>
              <Menu>
                <MenuButton as={Button} rightIcon={<FaBars />}>
                  Versions
                </MenuButton>
                <MenuList>
                  {currentItem.versions.map((version) => (
                    <MenuItem key={version.id} onClick={() => handleVersionChange(version)} bg={version.id === currentVersion.id ? "blue.100" : "white"}>
                      {version.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        {layout === "sidebar-right" && (
          <Box w="200px" bg="gray.200" p={4}>
            Right Sidebar
          </Box>
        )}
      </Flex>

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create/Edit Media Item</ModalHeader>
          <ModalBody>
            <Input placeholder="Enter media URL" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onModalClose}>Cancel</Button>
            <Button colorScheme="blue" ml={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MediaViewer;
