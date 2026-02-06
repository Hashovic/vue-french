<template>
    <nav class="fixed top-0 left-0 z-20 w-full bg-gray-200/95 dark:bg-[#181818]/80 justify-start sm:justify-center rounded-3xl shadow-md shadow-gray-300 dark:shadow-white/[0.08]">
        <div class="flex justify-between py-2 items-center dark:text-gray-200">
            <div class="w-1/3 flex items-center"></div>
            <div class="w-1/3 flex justify-center items-center">
                <RouterLink class="pr-2" to="/">
                    <svg class="size-10 text-sky-700 hover:text-amber-500 dark:text-amber-500 dark:hover:text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M11 7L8 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 7L13 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 10H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 14H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                </RouterLink>
                <ul class="hidden sm:flex flex-col sm:flex-row dark:text-gray-100">
                    <li>
                        <RouterLink to="/" class="text-[16px] px-3 hover:text-amber-500 dark:hover:text-fuchsia-600">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/conjugation" class="text-[16px] px-3 hover:text-amber-500 dark:hover:text-fuchsia-600">Conjugation</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/practice" class="text-[16px] px-3 hover:text-amber-500 dark:hover:text-fuchsia-600">Practice</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/help" class="text-[16px] px-3 hover:text-amber-500 dark:hover:text-fuchsia-600">Help</RouterLink>
                    </li>
                </ul>
            </div>
            <div class="w-1/3 flex justify-end items-center pr-8">
                <div @click="toggleDark()" class="cursor-pointer">
                    <div class="size-8 dark:stroke-gray-200 stroke-gray-800">
                        <svg v-if="isDark" class="hover:stroke-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.4" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        <svg v-else class="hover:stroke-sky-700 size-8 pt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.4" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { useDark, useToggle } from '@vueuse/core';

    const isDark = useDark();
    const toggleDark = useToggle(isDark);

</script>
