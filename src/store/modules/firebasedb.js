import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  //getDoc,
  //doc,
  addDoc,
  where,
  query,
  //deleteDoc,
  //updateDoc,
  //serverTimestamp,
  //orderBy,
} from "firebase/firestore";
import { db } from "@/main.js";

export const actionTypes = {
  getNotesByUserId: "[firedb] getNotesByUserId",
  addNote: "[firedb] addNote",
};

export const mutationType = {
  setNotes: "[firedb] setNotes",
  addNoteSuccess: "[firedb] addNoteSuccess",
  addNoteStart: "[firedb] addNoteStart",
};

const state = {
  notes: undefined,
  isLoading: false,
};
const mutations = {
  [mutationType.setNotes](state, payload) {
    state.notes = payload;
  },
  [mutationType.addNoteSuccess](state) {
    location.reload();
    state.isLoading = false;
  },

  [mutationType.addNoteStart](state) {
    state.isLoading = true;
  },
};

const actions = {
  [actionTypes.getNotesByUserId](context, { uid }) {
    return new Promise((resolve) => {
      context.commit(mutationType.addNoteStart);
      let q = query(collection(db, "notes"));
      if (uid) {
        q = query(collection(db, "notes"), where("uid", "==", uid));
      }

      getDocs(q).then((result) => {
        const notes = result.docs.map((doc) => {
          doc.data();
          return {
            id: doc.id,
            data: doc.data(),
          };
        });
        context.commit(mutationType.setNotes, notes);
        resolve();
      });
    });
  },
  [actionTypes.addNote](context, data) {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        addDoc(collection(db, "notes"), {
          data: data,
          uid: user.uid,
        });
        //context.commit(mutationType.addNoteSuccess);
        resolve();
      });
    });
  },
};
export default {
  actions,
  mutations,
  state,
};
