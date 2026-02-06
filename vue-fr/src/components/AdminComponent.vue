<template>

    <div class="flex flex-col justify-center items-center">
	<!-- Input Area -->
	<h2 class="text-center text-4xl mb-6">Add Issue</h2>
	<div class="flex justify-center w-full sm:w-2/3 lg:w-1/2 mb-4">
	    <AddIssue @added="fetchIssues" />
	</div>
	<!-- Issue Table -->
	<table class="table-auto w-2/3 border-2">
	    <thead class="border-2">
		<tr class="border-2">
		    <th class="px-2">id</th>
		    <th class="px-2">type</th>
		    <th class="px-2">issue</th>
		    <th class="px-2">solved</th>
	        </tr>
	    </thead>
	    <tbody>
	      <tr class="border-2 border-spacing-2" v-for="iss in issues" :key="iss.issue_id">
		  <td class="border-2">
		    <button
			class="p-2 w-full h-full cursor-pointer"
			@click="openDeleteModal(iss.issue_id)"
		    >
			{{ iss.issue_id }}
		    </button>
		  </td>
		  <td class="border-2 p-2">{{ iss.issue_type_id }}</td>
		  <td class="border-2 p-2">{{ iss.problem_desc }}</td>
		  <td @click="solveIssue(iss.issue_id)" class="border-2 p-2 cursor-pointer">{{ iss.solved }}</td>
	      </tr>
	    </tbody>
	</table>
	<Modal
	    v-model="modalToggle"
	    buttonText=""
	    modalTitle="Delete Confirmation"
	    modalBody="Are you sure you would like to delete this issue?"
	    buttonTextConfirm="Confirm"
	    customButtonClasses="hidden"
	    @confirm="deleteIssue(selectedIssueId)"
	/>
	<div class="flex w-2/3 justify-end pt-4 pb-10">
	    <button @click="changeShowState" class="cursor-pointer p-2 rounded-xl border-2 hover:bg-gray-500/20 border-gray-500/70 text-center font-mono">
		Show {{ showAll ? 'Unsolved': 'All'}}
	    </button>
	</div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import Modal from '@/components/Modals/Modal.vue';
    import AddIssue from '@/components/AddIssue.vue';

    const props = defineProps({
        token: String,
	apiRoute: String,
    });

    const issues = ref([]);
    const selectedIssueId = ref(null);
    const modalToggle = ref(false);
    const API = props.apiRoute;
    const showAll = ref(false);

    // Returns header format to server
    function authHeaders() {
	return props.token ? { Authorization: `Bearer ${ props.token }` } : {};
    }

    // Opens the delte modal for specified id
    function openDeleteModal(id) {
	selectedIssueId.value = id;
	modalToggle.value = true;
    }

    // Gets the issues based on the value of showAll
    async function fetchIssues() {
	let res;

	if (showAll.value === true) {
	    res = await fetch(`${API}/api/issues/viewall`, {
		headers: authHeaders(),
	    });
	}

	else {
	    res = await fetch(`${API}/api/issues/viewunsolved`, {
		headers: authHeaders(),
	    });
	}

	if (!res.ok) return;
	const issueData = await res.json();
	issues.value = issueData.issues;
    }

    // Sets the issue's state to solved
    async function solveIssue(id) {
	await fetch(`${API}/api/issues/makesolved/${id}`, {
	    method: "POST",
	    headers: authHeaders(),
	});
	fetchIssues();
    }

    // Deltes the issue from the database
    async function deleteIssue(id) {
	
	await fetch(`${API}/api/issues/removeissue/${id}`, {
	    method: "DELETE",
	    headers: authHeaders(),
	});
	fetchIssues();
    }

    // Change showing state from showall to showunsolved and vice versa
    function changeShowState() {
	showAll.value = !showAll.value;
	fetchIssues();
    }

    // Performs the initial fetch for the issues
    onMounted(() => {
	fetchIssues();
    })

</script>
