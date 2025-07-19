<template>
    <nav class="fixed top-0 left-0 w-full bg-gray-200 dark:bg-[#181818]/80 justify-start sm:justify-center shadow-md shadow-gray-300 dark:shadow-white/[0.08]">
        <div class="flex justify-center items-center">
            <RouterLink to="/">
                <svg class="size-12 text-gray-600 dark:text-amber-500 hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M11 7L8 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 7L13 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18 10H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 14H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" stroke="currentColor" stroke-width="1.5"/>
                </svg>
            </RouterLink>
            
            <ul class="hidden sm:flex flex-col sm:flex-row dark:text-gray-100">
                <li>
                    <RouterLink to="/" class="text-lg hover:text-green-900 px-3">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/conjugation" class="text-lg hover:text-green-900 px-3">Conjugation</RouterLink>
                </li>
                <li>
                    <RouterLink to="/game" class="text-lg hover:text-green-900 px-3">Game</RouterLink>
                </li>
                
            </ul>
        </div>
        
    </nav>
</template>

<!-- #1C274C -->