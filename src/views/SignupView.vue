<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useAuthStore } from '@/stores/Auth';
import router from '@/router';
import AppLogo from '@/components/AppLogo.vue';
import { useToast } from 'vue-toastification';

const toast = useToast()
const store = useAuthStore();
const email: Ref = ref("");
const password: Ref = ref("");
const phone: Ref = ref("");
let errorMessage: Ref = ref("");

const registerUser = async () => {
    const response = await store.signup(phone.value, email.value, password.value);
    if (response) {
        toast.success("Welcome!")
        router.push({ name: "home" });
    } else {
        toast.error("Sign up failed")
        errorMessage.value = "Sign up failed";
    }
};

const clearErrorMessage = () => {
    errorMessage.value = "";
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <AppLogo />
            <div class="mt-6 text-center">
                <h3 class="text-2xl font-bold mb-2 text-darkBlue">Sign up</h3>
                <p class="text-gray-600 mb-1">Already have an account?</p>
                <RouterLink class="text-primary hover:text-hoverPrimary" :to="{ name: 'login' }">Login</RouterLink>
            </div>
            <form @submit.prevent="registerUser">
                <div class="mb-4">
                    <label for="emailInput" class="block text-darkBlue font-medium mb-1">Email</label>
                    <input v-model="email" @focus="clearErrorMessage" required type="email" id="emailInput"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                </div>
                <div class="mb-4">
                    <label for="passwordInput" class="block text-darkBlue font-medium mb-1">Password</label>
                    <input v-model="password" @focus="clearErrorMessage" required type="password" id="passwordInput"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                </div>
                <div class="mb-4">
                    <label for="phoneInput" class="block text-darkBlue font-medium mb-1">Phone number</label>
                    <input v-model="phone" @focus="clearErrorMessage" required type="tel" id="phoneInput"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                </div>
                <div class="mb-6 text-center">
                    <button @click.prevent="registerUser" type="submit"
                        class="w-full py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition duration-300">Sign
                        up</button>
                </div>
            </form>
        </div>
    </div>
</template>
