
//edit profile
const editProfile = document.querySelector("#edit-profile-form");
editProfile.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = auth.currentUser;

  return db
    .collection("users")
    .doc(user.uid)
    .set(
      {
        phoneno: editProfile["add-phone-no"].value,
        gender: editProfile["gender"].value,
        age: editProfile["add-age"].value,
      },
      { merge: true }
    )
    .then(() => {
      const modal = document.querySelector("#modal-edit-profile");
      M.Modal.getInstance(modal).close();
      editProfile.reset();
      signupForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      signupForm.querySelector(".error").innerHTML = err.message;
    });
});
const cancelEditProfile = document.querySelector("#btn-cancel-update-profile");
cancelEditProfile.addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.querySelector("#modal-edit-profile");
  M.Modal.getInstance(modal).close();
});
