export default {
    data() {
        return {
            requiredRules: [
                v => !!v || 'This field is required',
            ],
            emailRules: [
                v => !!v || 'The Email is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (!!v && v?.length >= 6 ) || 'Password is too short',
            ],
        }
    },
}