import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase,ref,set,get} from "https://www.gstatic.com/firebasejs/9.22.2//firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCVu4iJsvm3YsQQwYtHleXwHaEcpaEe4Yw",
    authDomain: "innak-91479.firebaseapp.com",
    projectId: "innak-91479",
    storageBucket: "innak-91479.appspot.com",
    messagingSenderId: "385236608299",
    appId: "1:385236608299:web:fa8f053976b412c4e6516e",
    measurementId: "G-E08J05CFPE"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const createLink = async (Name,linkID) => {
    try {
      // Create data
      await set(ref(database, `link/${linkID}`), {
        name: Name
      });
      return true;
    } catch (error) {
      console.error("Error creating Room", error);
      return false;
    }
  };

  const getLinkData = async (linkID) => {
    try {
      // Retrieve the room data
      const linkRef = ref(database, `link/${linkID}`);
      const linkSnapshot = await get(linkRef);
  
      if (linkSnapshot.exists()) {
        const linkData = linkSnapshot.val();
        return linkData.name
      } else {
        console.log("Room does not exist!");
        return false;
      }
    } catch (error) {
      console.error("Error getting creater ID in Room", error);
      return false;
    }
  };
  

export {
    createLink,
    getLinkData
}