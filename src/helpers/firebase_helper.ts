import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

class FirebaseAuthBackend {
  constructor(firebaseConfig: any) {
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
        if (user) {
          sessionStorage.setItem("authUser", JSON.stringify(user));
        } else {
          sessionStorage.removeItem("authUser");
        }
      });
    }
  }

  registerUser = (email: any, password: any) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  editProfileAPI = (username: any, idx: any) => {
    return new Promise((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        // Update the display name
        currentUser
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            const data = (currentUser as any).multiFactor.user.displayName;

            resolve({
              data: { username: data },
              status: "Profile Updated Successfully",
            });
          })
          .catch(error => {
            reject(error);
          });
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  };

  loginUser = (email: any, password: any) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

  forgetPassword = (email: any): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url: `${window.location.protocol}//${window.location.host}/login`,
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  logout = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  addNewUserToFirestore = (user: any) => {
    const collection = firebase.firestore().collection("users");
    const { profile } = user.additionalUserInfo!;
    const details = {
      firstName: profile?.given_name ? profile.given_name : profile?.first_name,
      lastName: profile?.family_name ? profile.family_name : profile?.last_name,
      fullName: profile?.name,
      email: profile?.email,
      picture: profile?.picture,
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
    };
    collection.doc(firebase.auth().currentUser!.uid).set(details);
    return { user, details };
  };

  setLoggeedInUser = (user: firebase.User) => {
    sessionStorage.setItem("authUser", JSON.stringify(user));
  };

  getAuthenticatedUser = (): firebase.User | null => {
    const authUser = sessionStorage.getItem("authUser");
    if (!authUser) return null;
    return JSON.parse(authUser);
  };

  _handleError(error: firebase.auth.Error): string {
    return error.message;
  }
}

let _fireBaseBackend: FirebaseAuthBackend | null = null;

const initFirebaseBackend = (config: any): FirebaseAuthBackend => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

const getFirebaseBackend = (): FirebaseAuthBackend | null => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };
