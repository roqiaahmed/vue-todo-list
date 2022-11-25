<template>
    <div class="container">
        <div class="sign-in">
            <h1>Sign in</h1>
            <form @submit.prevent="signIn">
                <div class="mb-3">
                    <label for="InputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="InputEmail1" v-model="users.email" />
                </div>
                <div class="mb-3">
                    <label for="InputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="InputPassword" v-model="users.password" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const auth = getAuth();
        const users = ref([]);
        const signIn = () => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, users.value.email, users.value.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("from signin", user);
                    router.push({ name: "lists" });
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("router to sign up");
                    router.push({ name: "signUp" });
                });
        };
        return {
            users,
            auth,
            signIn,
        };
    },
};
</script>
