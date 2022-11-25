<template>
    <div class="container">
        <div class="home">
            <h1>Sign Up</h1>
            <form @submit.prevent="newUser">
                <div class="mb-3">
                    <label for="InputName" class="form-label">Your Name</label>
                    <input type="name" class="form-control" id="InputName" v-model="users.name" />
                </div>
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
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "firebase/auth";
export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const auth = getAuth();
        const users = ref([]);

        const newUser = () => {
            const user = {
                name: users.value.name,
                password: users.value.password,
                email: users.value.email,
            };
            users.value = user;
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("from signup user is = ", user);
                    router.push({ name: "lists" });
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        };
        return {
            users,
            auth,
            newUser,
        };
    },
};
</script>

<style>
.home {
    width: 50%;
    margin: 0 auto;
    margin-top: 50px;
}

.home h1 {
    text-align: center;
}

.home form button {
    width: 100%;
    margin-top: 19px;
    background-color: #6aabff;
    border: none;
}
</style>
