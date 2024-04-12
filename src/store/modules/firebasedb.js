import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
  // deleteDoc,
  // updateDoc,
  serverTimestamp,
  updateDoc,
  orderBy,
  // orderBy,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db } from '@/main.js';

export const actionTypes = {
  getRecipesByUserId: '[firedb] getRecipesByUserId',
  addRecipe: '[firedb] addRecipe',
  updatePassword: '[auth] Update Password',
  getUserDetails: '[auth] Get User Details',
  getRecipeById: '[firedb] getRecipeById',
  createUserWithUsername: '[auth] Create User with username',
  getUserById: '[auth] Get User by ID',
  uploadImage: '[firedb] Upload Image',
};

export const mutationType = {
  setRecipes: '[firedb] setRecipes',
  addRecipeSuccess: '[firedb] addRecipeSuccess',
  addRecipeStart: '[firedb] addRecipeStart',
};

const state = {
  recipes: undefined,
  isLoading: false,
};
const mutations = {
  [mutationType.setRecipes](state, payload) {
    state.recipes = payload;
  },
  [mutationType.addRecipeSuccess](state) {
    state.isLoading = false;
  },

  [mutationType.addRecipeStart](state) {
    state.isLoading = true;
  },
};

const actions = {
  [actionTypes.getRecipesByUserId](context, { uid }) {
    return new Promise((resolve) => {
      context.commit(mutationType.addRecipeStart);
      let q = query(collection(db, 'recipes'), orderBy('created', 'desc'));
      if (uid) {
        q = query(
          collection(db, 'recipes'),
          where('uid', '==', uid),
          orderBy('created', 'desc')
        );
      }

      getDocs(q).then((result) => {
        const recipes = result.docs.map((doc) => {
          doc.data();
          return {
            id: doc.id,
            data: doc.data(),
          };
        });
        context.commit(mutationType.setRecipes, recipes);
        resolve();
      });
    });
  },
  [actionTypes.addRecipe](context, data) {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        addDoc(collection(db, 'recipes'), {
          data,
          uid: user.uid,
          created: serverTimestamp(),
          images: [],
        });
        context.commit(mutationType.addRecipeSuccess);
        resolve();
      });
    });
  },

  [actionTypes.createUserWithUsername](context, { id, username }) {
    return new Promise(() => {
      addDoc(collection(db, 'users'), {
        username,
        uid: id,
        created: serverTimestamp(),
      });
    });
  },

  [actionTypes.updatePassword](context, { newPassword }) {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        updatePassword(user, newPassword)
          .then(() => {
            resolve('Password updated successfully');
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No authenticated user');
      }
    });
  },

  [actionTypes.getUserDetails]() {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userDetails = {
          uid: user.uid,
          email: user.email,
          providers: user.providerData.map((provider) => provider.providerId),
          created: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
        };
        resolve(userDetails);
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No authenticated user');
      }
    });
  },
  [actionTypes.getRecipeById](context, { id }) {
    return new Promise((resolve, reject) => {
      const docRef = doc(db, 'recipes', id);
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            console.log('Document data:', doc.data());
            resolve({
              id: doc.id,
              data: doc.data().data,
              uid: doc.data().uid,
              images: doc.data().images,
            });
          } else {
            reject('No such document');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [actionTypes.getUserById](context, { id }) {
    return new Promise((resolve, reject) => {
      const docRef = doc(db, 'users', id);
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            console.log('user data:', doc.data());
            resolve(doc.data());
          } else {
            reject('No such document');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [actionTypes.uploadImage](context, { recipeId, image, images }) {
    console.log('recipeId', recipeId);
    console.log('image', image);
    const date = Date.now();
    return new Promise(() => {
      const storage = getStorage();
      let storageRef = ref(storage, `images/${recipeId}/${image.name}-${date}`);
      uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        getDownloadURL(storageRef).then((url) => {
          console.log('url', url);
          const recipeRef = doc(db, 'recipes', recipeId);
          updateDoc(recipeRef, {
            images: [...images, url],
          });
        });

        // .then((url) => {

        // });
      });
    });
  },
};
export default {
  actions,
  mutations,
  state,
};
