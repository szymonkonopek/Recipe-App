/* eslint-disable no-shadow */
/* eslint-disable prefer-promise-reject-errors */
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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// eslint-disable-next-line import/no-cycle, import/extensions
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
  deleteImage: '[firedb] Delete Image',
  addReview: '[firedb] Add Review',
  getReviewsByRecipeId: '[firedb] Get Reviews by Recipe ID',
  checkifCanReview: '[firedb] Check if can review',
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

  /** getRecipesByUserId():
 * Action to fetch recipes by user ID from Firestore.
 * Retrieves recipes ordered by creation date, optionally filtered by user ID.
 * Commits a mutation to indicate the start of adding recipes.
 * Fetches recipes from Firestore based on the provided user ID.
 * Commits a mutation to set fetched recipes in the state.
 * Resolves the Promise once recipes are fetched and mutations are committed.
 */

  [actionTypes.getRecipesByUserId](context, { uid }) {
    return new Promise((resolve) => {
      context.commit(mutationType.addRecipeStart);
      let q = query(collection(db, 'recipes'), orderBy('created', 'desc'));
      if (uid) {
        q = query(
          collection(db, 'recipes'),
          where('uid', '==', uid),
          orderBy('created', 'desc'),
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

        console.log('error?');
        context.commit(mutationType.setRecipes, recipes);
        resolve();
      });
    });
  },

  /** addRecipe:
 * Action to add a new recipe to Firestore.
 * Listens for authentication state changes to get the current user.
 * Adds the recipe document to the 'recipes' collection with user ID and timestamp.
 * Commits a mutation to indicate the successful addition of a recipe.
 * Resolves the Promise once the recipe is successfully added.
 */

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

/** createUserWithUsername
 * Action to create a new user with a username in Firestore.
 * Adds a new user document to the 'users' collection with the provided username and ID.
 * Resolves the Promise once the user is successfully created.
 */

  [actionTypes.createUserWithUsername](context, { id, username }) {
    return new Promise(() => {
      addDoc(collection(db, 'users'), {
        username,
        uid: id,
        created: serverTimestamp(),
      });
    });
  },
/** updatePassword
 * Action to update the password of the currently authenticated user.
 * Retrieves the current user's authentication instance.
 * If the user is authenticated, updates the password using the provided new password.
 * Resolves with a success message if the password is updated successfully.
 * Rejects with an error if there is no authenticated user.
 */

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

/** getUserDetails
 * Action to get details of the currently authenticated user.
 * Retrieves the current user's authentication instance.
 * If the user is authenticated, constructs and resolves with an object containing user details,
 * such as UID, email, authentication providers, creation time, and last sign-in time.
 * Rejects with an error if there is no authenticated user.
 */

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

/** getRecipeById
 * Action to fetch a recipe by its ID from Firestore.
 * Constructs a document reference for the recipe using the provided ID.
 * Fetches the document data from Firestore.
 * If the document exists, resolves with an object containing the recipe details.
 * If the document doesn't exist, resolves with null.
 * Rejects with an error if there is any issue with fetching the document.
 */

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
              created: doc.data().created,
            });
          } else {
            // reject('No such document');
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

/** getUserById
 * Action to fetch a user by their ID from Firestore.
 * Constructs a document reference for the user using the provided ID.
 * Fetches the document data from Firestore.
 * If the document exists, resolves with an object containing the user details.
 * If the document doesn't exist, logs a message and resolves with null.
 * Rejects with an error if there is any issue with fetching the document.
 */

  [actionTypes.getUserById](context, { id }) {
    return new Promise((resolve, reject) => {
      const docRef = doc(db, 'users', id);
      getDoc(docRef)
        .then((docEl) => {
          if (docEl.exists()) {
            console.log('user data:', docEl.data());
            resolve(docEl.data());
          } else {
            console.log('No such document');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

/** uploadImage
 * Action to upload and add an image to a recipe in Firestore storage.
 * Resizes and compresses the image before uploading.
 * Converts the image to a data URL and then to a Blob.
 * Uploads the Blob to Firestore storage and retrieves the download URL.
 * Adds the image details (name and URL) to the recipe document in Firestore.
 */

  [actionTypes.uploadImage](context, { recipeId, image, images }) {
    console.log('recipeId', recipeId);
    console.log('image', image);

    // Function to resize and compress image
    const resizeAndCompressImage = (img, maxWidth, maxHeight, quality) => {
      const canvas = document.createElement('canvas');
      let { width } = img;
      let { height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      return canvas.toDataURL('image/jpeg', quality);
    };

    // Create a new image element
    const img = new Image();
    img.src = URL.createObjectURL(image);

    // Wait for the image to load
    img.onload = function () {
      // Resize and compress the image
      // eslint-disable-next-line max-len
      const resizedAndCompressedDataURL = resizeAndCompressImage(img, 800, 600, 0.7); // Adjust quality as needed

      // Convert data URL back to a Blob
      fetch(resizedAndCompressedDataURL)
        .then((res) => res.blob())
        .then((resizedAndCompressedBlob) => {
          const date = Date.now();
          return new Promise((resolve) => {
            const storage = getStorage();
            const storageRef = ref(storage, `images/${recipeId}/${image.name}-${date}`);
            uploadBytes(storageRef, resizedAndCompressedBlob).then((snapshot) => {
              console.log('Uploaded a blob or file!', snapshot);
              getDownloadURL(storageRef).then((url) => {
                console.log('url', url);
                const imageObject = {
                  name: `${image.name}-${date}`,
                  url,
                };
                const recipeRef = doc(db, 'recipes', recipeId);
                updateDoc(recipeRef, {
                  images: [...images, imageObject],
                }).then(() => {
                  resolve();
                });
              });
            });
          });
        });
    };
  },

  /** deleteImage
 * Action to delete an image associated with a recipe from Firestore storage and remove its reference from the recipe document.
 * Constructs a reference to the image in Firestore storage.
 * Deletes the image object from Firestore storage.
 * Updates the recipe document in Firestore to remove the deleted image from the list of images.
 */

  [actionTypes.deleteImage](context, { recipeId, image, images }) {
    return new Promise((resolve) => {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${recipeId}/${image.name}`);
      deleteObject(storageRef).then(() => {
        console.log('File deleted successfully');
        const recipeRef = doc(db, 'recipes', recipeId);
        const newImages = images.filter((img) => img.name !== image.name);
        updateDoc(recipeRef, {
          images: [...newImages],
        }).then(() => {
          resolve();
        });
      });
    });
  },

/** addReview
 * Action to add a review for a recipe to Firestore.
 * Listens for authentication state changes to get the current user.
 * Adds a new review document to the 'reviews' collection with user ID, creation timestamp, recipe ID, and review content.
 * Commits a mutation to indicate the successful addition of a review.
 * Resolves the Promise once the review is successfully added.
 */

  [actionTypes.addReview](context, { recipeId, review }) {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        addDoc(collection(db, 'reviews'), {
          uid: user.uid,
          created: serverTimestamp(),
          recipeId,
          review,
        }).then(() => {
          resolve();
        });
        context.commit(mutationType.addRecipeSuccess);
      });
    });
  },
/** getReviewsByRecipeId
 * Action to fetch reviews for a recipe by its ID from Firestore.
 * Constructs a query to filter reviews by the provided recipe ID and order them by creation timestamp.
 * Fetches the reviews documents from Firestore based on the constructed query.
 * Maps the fetched documents to an array of review objects containing their IDs and data.
 * Resolves the Promise with the array of reviews.
 */

  [actionTypes.getReviewsByRecipeId](context, { recipeId }) {
    return new Promise((resolve) => {
      const q = query(
        collection(db, 'reviews'),
        where('recipeId', '==', recipeId),
        orderBy('created', 'desc'),
      );
      getDocs(q).then((result) => {
        const reviews = result.docs.map((docEl) => {
          docEl.data();
          return {
            id: docEl.id,
            data: docEl.data(),
          };
        });

        console.log('error?');
        resolve(reviews);
      });
    });
  },

  /** checkifCanReview
 * Action to check if the current user can review a recipe by its ID.
 * Listens for authentication state changes to get the current user.
 * Constructs a query to check if the user has already reviewed the recipe.
 * Resolves with true if the user can review the recipe (has not reviewed it yet), otherwise resolves with false.
 */

  [actionTypes.checkifCanReview](context, { recipeId }) {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const q = query(
            collection(db, 'reviews'),
            where('recipeId', '==', recipeId),
            where('uid', '==', user.uid),
          );
          getDocs(q).then((result) => {
            if (result.docs.length > 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        } else {
          resolve(false);
        }
      });
    });
  },
};
export default {
  actions,
  mutations,
  state,
};
