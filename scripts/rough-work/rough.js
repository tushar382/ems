   const applybtn = document.querySelector('#apply-btn');
    applybtn.addEventListener('click' , (e) => {
        e.preventDefault();
        const applyForm = document.querySelector('#apply-form');
        applyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            db.collection('eventResponses').add({
                name: applyForm['name'].value,
                phoneno: applyForm['phone'].value
            }).then(() => {
                //close the modal and reset form
                const modal = document.querySelector('#modal-apply');
                M.Modal.getInstance(modal).close();
                applyForm.reset();
            }).catch(err => {
                console.log(err.message);
            })
        });

        console.log('Button Clicked');
    });  