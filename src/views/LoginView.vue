<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useAuthStore } from '@/stores/Auth';
import router from '@/router';
import AppLogo from '@/components/AppLogo.vue';
import { useToast } from 'vue-toastification';
import LoadingButton from "@/components/LoadingButton.vue"
const toast = useToast()
const store = useAuthStore();
const email: Ref = ref("");
const password: Ref = ref("");
let errorMessage: Ref = ref("");
let isLoading: Ref = ref(false)

const authUser = async () => {
    try {
        isLoading.value = true
        const response = await store.login(email.value, password.value);
        isLoading.value = false
        if (response) {
            toast.success("Welcome back")
            router.push({ name: "home" });
        } else {
            toast.error("Email or password incorrect")
            errorMessage.value = "Login failed";
        }
    } catch (error: any) {
        toast.error("An error occurred during login: " + error.message)
        errorMessage.value = "An error occurred during login: " + error.message;
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
                <h3 class="text-2xl font-bold mb-2 text-darkBlue">Log in to your account</h3>
                <p class="text-gray-600 mb-1">Don't have an account?</p>
                <RouterLink class="text-primary hover:text-hoverPrimary" :to="{ name: 'signup' }">Sign up</RouterLink>
            </div>
            <form @submit.prevent="authUser">
                <div class="mb-4">
                    <label for="emailInput" class="block text-darkBlue font-medium mb-1">Email</label>
                    <input v-model="email" @focus="clearErrorMessage" placeholder="test@example.com" required
                        type="email" id="emailInput"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                </div>
                <div class="mb-4">
                    <label for="passwordInput" class="block text-darkBlue font-medium mb-1">Password</label>
                    <input v-model="password" @focus="clearErrorMessage" placeholder="password" required type="password"
                        id="passwordInput"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                </div>
                <div class="mb-6 text-center">
                    <div class="mb-6 text-center">
                        <LoadingButton :isLoading="isLoading" text="Login" @click="authUser"
                            :disabled="!email || !password" />
                    </div>
                    <a href="javascript:void(0)" class="text-primary mt-2 inline-block hover:text-hoverPrimary">Forgot
                        password?</a>
                </div>
            </form>
        </div>
    </div>
</template>
