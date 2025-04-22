import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [staff, setStaff] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [inventory, setInventory] = useState([]);

  const fetchStaffList = async() => {
    const staffResponse = await fetch('http://localhost:8080/staff/all');
    const staffResponseObj = await staffResponse.json();
    setStaffList(staffResponseObj);
  }
  // Load initial datac
  const fetchAllAnimals = async() =>{
    const allAnimals = await fetch(`http://localhost:8080/animal/all`);
    const allAnimalsList = await allAnimals.json();
    setAnimals(allAnimalsList);
  }
  useEffect(() => {
    const fetchData = async()=>{
      fetchAllAnimals();
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) setAdmin(JSON.parse(storedAdmin));

      const storedStaff = localStorage.getItem("staff");
      if (storedStaff) setStaff(JSON.parse(storedStaff));
      // const staffResponse = await fetch('http://localhost:8080/staff/all');
      // const staffResponseObj = await staffResponse.json();
      // setStaffList(staffResponseObj);

      fetchStaffList();
      fetchAllItems();
      }

    fetchData();
  }, []);

  
  // Admin authentication
  const login = (adminData) => {
    if (adminData.role !== "ZooManager") {
      throw new Error("Access denied: Not a Zoo Manager");
    }
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  // Staff authentication
  const loginStaff = async (credentials) => {
    // In a real app, this would be an API cal
    const response = await fetch(`http://localhost:8080/login/${credentials.id}/${credentials.password}`);
    const responseObj = await response.json();

    const foundStaff = responseObj;
    if (!foundStaff || foundStaff.role=="ZooManager") throw new Error("Invalid credentials");
    localStorage.setItem("staff", JSON.stringify(foundStaff));
    setStaff(foundStaff);
    return foundStaff;
  };

  const registerStaff = async (staffData) => {
    // In a real app, this would be an API call
    const newStaff = { ...staffData, id: staffList.length + 1 };
    setStaffList([...staffList, newStaff]);
    localStorage.setItem("staff", JSON.stringify(newStaff));
    setStaff(newStaff);
    return newStaff;
  };

  const logoutStaff = () => {
    localStorage.removeItem("staff");
    setStaff(null);
  };

  // Data management functions
  const addAnimal = (animal) => {
    fetch('http://localhost:8080/animal/add',{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animal)
    }
    )

    fetchAllAnimals();
    const newAnimal = { ...animal, id: animals.length + 1 };
    // setAnimals([...animals, newAnimal]);
    return newAnimal;
  };

  const addStaff = (staffMember) => {
    staffMember = {...staffMember, id: staffList.length + 1};
    const staffRequest = {
      staffMember: staffMember,
      managerID: admin.id
    }

    const sendAddStaffData = async()=>{
      await fetch(`http://localhost:8080/staff/add/${staffMember.role}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(staffRequest)
        }
      );

      fetchStaffList();
    }

    sendAddStaffData();
    const newStaff = { ...staffMember, id: staffList.length + 1 };
    
    return newStaff;
  };

  const deleteStaff = async(staffToDelete) => {
    await fetch(`http://localhost:8080/staff/remove/${staffToDelete.id}/${admin.id}`,{
      method:"DELETE"
    })

    fetchStaffList();
  }

  const fetchAllItems = async() => {
    const staffResponse = await fetch('http://localhost:8080/inventory/all');
    const staffResponseObj = await staffResponse.json();
    setInventory(staffResponseObj);
  }

  const addInventoryItem = (item) => {
    console.log(item);
    fetch('http://localhost:8080/inventory/add',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item)
    })
    fetchAllItems();
  };

  const updateInventoryItem = (updatedItem) => {
    fetch('http://localhost:8080/inventory/update',{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem)
    })
    // setInventory(
    //   inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    // ); 
    fetchAllItems();
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        staff,
        animals,
        staffList,
        inventory,
        login,
        logout,
        loginStaff,
        logoutStaff,
        registerStaff,
        addAnimal,
        addStaff,
        deleteStaff,
        addInventoryItem,
        updateInventoryItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
