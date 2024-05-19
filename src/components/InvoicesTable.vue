<script setup lang="ts">
import { useInvoicesStore } from '@/stores/Invoices';
import { useSellersStore } from '@/stores/Sellers';
import { computed, onMounted } from 'vue';

const sellerStore = useSellersStore()
const invoiceStore = useInvoicesStore()

onMounted(async () => {
    await invoiceStore.getInvoices()
    await sellerStore.getSellers()
    invoiceStore.calculateTotalPrice()

})

const sortedInvoices = computed(() => {
    if (!invoiceStore.invoices) return [];

    return invoiceStore.invoices.slice().sort((a, b) => {
        const invoiceATimestamp = new Date(a.date).getTime();
        const invoiceBTimestamp = new Date(b.date).getTime();

        return invoiceBTimestamp - invoiceATimestamp;;
    });
});

</script>
<template>
    <div class="text-xl font-semibold mb-4 mt-9 text-center text-[#2E3A46]">
        Reward Summary
    </div>
    <div class="mt-8 flex justify-center overflow-x-auto">
        <table class="w-full max-w-5xl text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-[#E6F4F1]">
                <tr>
                    <th scope="col" class="px-6 py-3 rounded-tl-lg">
                        Day
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Seller name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Seller ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Invoice number
                    </th>
                    <th scope="col" class="px-6 py-3 rounded-tr-lg">
                        Money earn
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(invoice, idx) in sortedInvoices" :key="idx"
                    :class="[idx % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]']">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ invoice.date }}
                    </th>
                    <td class="px-6 py-4">
                        {{ invoice.seller.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ invoice.seller.id }}
                    </td>
                    <td class="px-6 py-4">
                        {{ invoice.id }}
                    </td>
                    <td class="px-6 py-4">
                        ${{ invoice.total }}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="font-semibold text-gray-900 bg-[#E6F4F1]">
                    <th scope="row" class="px-6 py-3 text-base">Total Rewards Given</th>
                    <td class="px-6 py-3"></td>
                    <td class="px-6 py-3"></td>
                    <td class="px-6 py-3"></td>
                    <td class="px-6 py-3">
                        ${{ invoiceStore.totalPriceGiven }}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
