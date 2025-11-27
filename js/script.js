document.addEventListener('alpine:init', () => {
    Alpine.data('loginForm', () => ({
        email: '',
        password: '',
        errors: {},

        validateForm() {
            this.errors = {}

            if(this.password.length < 8) {
                this.errors.password = 'Password must be at least 8 characters'
            }
            if(this.email.length === 0) {
                this.errors.email = 'Please fill email field'
            }
        }, 

        submitForm($event) {
            this.validateForm()

            if(Object.keys(this.errors).length === 0) {
                console.log(this.email, this.password);
                $event.target.reset()
            }
        }
    }))

    Alpine.data('signupForm', () => ({
        fullName: '',
        email: '',
        city: '',
        cities: [
            'New York (USA)',
            'Los Angeles (USA)',
            'Chicago (USA)',
            'Houston (USA)',
            'Miami (USA)',
            'Yishun (Singapore)',
            'Tampines (Singapore)',
            'Jurong East (Singapore)',
            'Woodlands (Singapore)',
            'Bedok (Singapore)'
        ],
        password: '',
        confirmPassword: '',
        showPassword: false,
        errors: {},

        validateForm() {
            this.errors = {}

            if(this.email.length === 0) {
                this.errors.email = 'Please fill email field'
            }
            if(this.fullName.length === 0) {
                this.errors.fullName = 'Please fill name field'
            }
            if(!this.city) {
                this.errors.city = 'Please choose city field'
            }
            if(this.password.length < 6) {
                this.errors.password = 'Password must be at least 6 characters'
            }
            if(this.password !== this.confirmPassword) {
                this.errors.confirmPassword = 'Password do not match'
            }
        },

        submitForm($event) {
            this.validateForm()
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            if(Object.keys(this.errors).length === 0) {
                console.log(
                    this.fullName,
                    this.email,
                    this.city,
                    this.password
                );
                Toast.fire({
                    icon: "success",
                    title: "Sign up successfully"
                });
                $event.target.reset()
            }
        },

        eyePath() {
            const openPath = "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zm9.542 3a3 3 0 100-6 3 3 0 000 6z";

            const closedPath = "M3.98 8.223A10.477 10.477 0 002.458 12C3.645 15.708 7.364 18.5 12 18.5c1.67 0 3.26-.328 4.692-.918M6.228 6.228A10.45 10.45 0 0112 5c4.636 0 8.355 2.792 9.542 6.5a10.523 10.523 0 01-1.33 2.547M3 3l18 18";

            return this.showPassword ? openPath : closedPath;
        }
    }))
})