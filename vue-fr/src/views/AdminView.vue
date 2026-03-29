<template>
    <div
        class="flex mb-5 items-baseline justify-center flex-wrap border-2 p-4 rounded-2xl"
    >
        <h1
            class="flex text-6xl overflow-hidden sm:text-7xl font-mono tracking-widest"
        >
            ADMIN
        </h1>
    </div>
    <div class="flex gap-x-5"v-if="!token">
	<input
	    v-model="adminPass"
	    type="password"
	    placeholder="Admin password"
	    name="passwordInput"
	    class="border-2 border-gray-300 p-2 rounded outline-none"
	    @input="incorrectPass = false"
	    :class="{'border-red-500': incorrectPass}"
	/>
	<button 
	    class="cursor-pointer p-2 rounded-xl border-2 hover:bg-gray-500/20 border-gray-500/70 text-center font-mono"
	    @click="adminLogin"
	>
	    Login
	</button>
    </div>
    <AdminComponent v-else :token="token" :api-route="API_BASE" />
</template>
<script setup>
    import { ref } from 'vue';
    import AdminComponent from '@/components/AdminComponent.vue';
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const adminPass = ref("");
    const incorrectPass = ref(false);
    const token = ref("");


    // Admin login api - returns token if password is correct
    async function adminLogin() {
	const res = await fetch(`${API_BASE}/api/admin/login`, {
	    method: "POST",
	    headers: { "Content-Type": "application/json" },
	    body: JSON.stringify({ password: adminPass.value }),
	});

	if (!res.ok) {
	    alert("Server Issue");
	    return;
	}

	const data = await res.json();
	if (!data.ok) {
	    incorrectPass.value = true;
	    return;
	}
	token.value = data.token;
    }
</script>
