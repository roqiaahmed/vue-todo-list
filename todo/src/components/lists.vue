<template>
    <div class="container">
        <span @click="logout">sign out</span>
        <h1 class="text-center">Your list</h1>

        <div class="todo-box">
            <div class="input-group mb-3 add-box">
                <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon"
                    aria-describedby="button-addon1" v-model="newTodoContent" />
                <button class="btn btn-outline-secondary" type="button" id="button-addon1" :disabled="!newTodoContent"
                    @click="addTodo">
                    Add
                </button>
            </div>
        </div>

        <div class="card mb-3" v-for="list in lists">
            <div class="card-body" :class="list.done ? 'card-body-done' : 'card-body'">
                {{ list.content }}
                <button type="button" class="btn" :class="list.done ? 'btn-success-done' : 'btn-success'"
                    @click="doneMark(list.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-check2" viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                </button>
                <button type="button" class="btn btn-danger" @click="deleteTodo(list.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getAuth,
    signOut,
} from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { db } from "../firebase/index";
import {
    collection,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    query,
    orderBy,
} from "firebase/firestore";
export default {
    setup() {

        const newTodoContent = ref("");
        const lists = ref([]);
        const router = useRouter();
        const route = useRoute();
        const auth = getAuth();
        const user = auth.currentUser;
        const todocollectionRef = collection(db, user ? user.uid : 'lists');
        const todoQueryRef = query(todocollectionRef, orderBy("data", "desc"));

        onMounted(() => {
            if(!user){
                router.push({ name: "signIn" });
            }
            onSnapshot(todoQueryRef, (querySnapshot) => {
            const fdlist = [];
            querySnapshot.forEach((doc) => {
                let todo = {
                    id: doc.id,
                    content: doc.data().content,
                    done: doc.data().done,
                };
                fdlist.push(todo);
            });
            lists.value = fdlist;

            });
        });

        const addTodo = () => {
            const docRef = addDoc(todocollectionRef, {
                content: newTodoContent.value,
                done: false,
                data: Date.now(),
            });
            newTodoContent.value = "";
        };

        const deleteTodo = (id) => {
            deleteDoc(doc(todocollectionRef, id));
        };

        const doneMark = (id) => {
            let index = lists.value.findIndex((list) => list.id === id);

            updateDoc(doc(todocollectionRef, id), {
                done: !lists.value[index].done,
            });
        };
        const logout = () => {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    //router to home(sign in)
                    router.push({ name: "signIn" });
                })
                .catch((error) => {
                    // stay at the page
                    router.push({ name: "lists" });
                });
        };
        return {
            logout,
            lists,
            addTodo,
            newTodoContent,


            deleteTodo,
            doneMark,
            signOut,
        };
    },
};
</script>

<style>
.todo-box {
    margin: 0 auto;
    width: 50%;
    margin-bottom: 4px;
}

.todo-box .add-box input {
    margin-right: -2px;
}

.todo-box .add-box input:focus {
    box-shadow: none;
}

.todo-box .add-box button {
    background-color: #1c7fff;
    border: none;
    color: #fff;
}

.todo-box .add-box button:focus {
    box-shadow: none;
}

.card {
    width: 50%;
    margin: 0 auto;
}

.card-body-done {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
    background-color: #e1f4dd78;
    text-decoration: line-through;
    text-decoration-color: currentcolor;
    text-decoration-color: #84d074;
    text-decoration-thickness: 2px;
    color: #84d074;
}

.card button {
    float: right;
    margin-left: 4px;
    border: none;
}

.card .btn-success-done {
    background-color: #40b75ad1;
    color: #fff;
    border: #40b75ad1;
}

.card .btn-success {
    background-color: #4f4f4f33;
    color: #000;
}

.card .btn-danger {
    background-color: #ff6372;
}
</style>
