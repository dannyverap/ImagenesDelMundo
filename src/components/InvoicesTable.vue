<script setup lang="ts">
import { useInvoicesStore } from '@/stores/Invoices';
import { useSellersStore } from '@/stores/Sellers';
import { ref, computed, onMounted } from 'vue';
import SkeletonInvoiceTable from './skeletons/SkeletonInvoiceTable.vue';

const sellerStore = useSellersStore();
const invoiceStore = useInvoicesStore();
const isLoading = ref(true);

onMounted(async () => {
    await invoiceStore.getInvoices();
    await sellerStore.getSellers();
    invoiceStore.calculateTotalPrice();
    isLoading.value = false;
});

const sortedInvoices = computed(() => {
    if (!invoiceStore.invoices) return [];

    return invoiceStore.invoices.slice().sort((a, b) => {
        const invoiceATimestamp = new Date(a.date).getTime();
        const invoiceBTimestamp = new Date(b.date).getTime();

        return invoiceBTimestamp - invoiceATimestamp;
    });
});
</script>

<template>
    <div class="text-xl font-semibold mb-4 mt-9 text-center text-textPrimary">
        Reward Summary
    </div>
    <div class="mt-8 flex justify-center overflow-x-auto">
        <table class="w-full max-w-5xl text-sm text-left rtl:text-right text-gray-700">
            <thead class="text-xs text-textPrimary bg-background uppercase">
                <tr>
                    <th scope="col" class="px-6 py-3 rounded-tl-lg">Day</th>
                    <th scope="col" class="px-6 py-3">Seller name</th>
                    <th scope="col" class="px-6 py-3">Seller ID</th>
                    <th scope="col" class="px-6 py-3">Invoice number</th>
                    <th scope="col" class="px-6 py-3 rounded-tr-lg">Money earn</th>
                </tr>
            </thead>
            <transition-group name="table-row" tag="tbody">
                <template v-if="isLoading">
                    <SkeletonInvoiceTable />
                </template>
                <template v-else>
                    <tr v-for="(invoice, idx) in sortedInvoices" :key="invoice.id"
                        :class="[idx % 2 === 0 ? 'bg-gray-100' : 'bg-white']">
                        <th scope="row" class="px-6 py-4 font-medium text-textPrimary whitespace-nowrap">{{ invoice.date
                            }}</th>
                        <td class="px-6 py-4 text-textPrimary">{{ invoice.seller.name }}</td>
                        <td class="px-6 py-4 text-textPrimary">{{ invoice.seller.id }}</td>
                        <td class="px-6 py-4 text-textPrimary">{{ invoice.id }}</td>
                        <td class="px-6 py-4 text-textPrimary">${{ invoice.total }}</td>
                    </tr>
                </template>
            </transition-group>
            <tfoot v-if="!isLoading">
                <tr class="font-semibold text-textPrimary">
                    <th scope="row" class="px-6 py-3 text-base">Total Rewards Given</th>
                    <td class="px-6 py-3"></td>
                    <td class="px-6 py-3"></td>
                    <td class="px-6 py-3"></td>
                    <td class="px-6 py-3">${{ invoiceStore.totalPriceGiven }}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<style scoped>
.table-row-enter-active,
.table-row-leave-active,
.table-row-move {
    transition: all 0.5s ease;
}

.table-row-enter-from,
.table-row-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.table-row-leave-active {
    position: absolute;
}
</style>
