<template>
    <v-dialog :width="$vuetify.display.smAndDown ? 'auto' : 650" :model-value="isDialogVisible"
        @update:model-value="(value) => $emit('updateModalState', value)">
        <v-card class="rounded-lg pa-sm-5 pa-2">
            <v-card-text>
                <h4 class="text-h4 text-center mb-5">
                    Converter {{ material.name }}
                </h4>
                <v-col>
                    <v-row class="d-flex justify-space-between px-4">
                        <v-col cols="12" md="5">
                            <v-text-field suffix="kg" label="Quantidade" type="number" v-model.number="amount"
                                @input="updateConversion()"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-row>
                                <v-col cols="12">
                                    Preço por kg: <b>R${{ material.price }}</b> 
                                </v-col>
                                <v-col cols="12" class="pt-1">
                                    Total: R$ <b>{{ conversion.toFixed(2) }}</b>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-card-text>
            <v-col cols="12" class="d-flex flex-wrap justify-space-around">
                <v-btn class="mx-4 px-10" color="red" variant="tonal" @click="onFormReset">
                    Sair
                </v-btn>
            </v-col>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        material: {
            type: Object,
            required: true
        },
        isDialogVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            amount: 0,
            conversion: 0
        };
    },
    methods: {
        updateConversion() {
            this.conversion = this.amount * this.material.price;
        },
        onFormReset() {
            this.amount = 0;
            this.conversion = 0;
            this.$emit('updateModalState', false);
        },
        onFormSubmit() {
            this.$emit('updateModalState', false);
        }
    },
    watch: {
        isDialogVisible(value) {
                this.amount = 0;
                this.conversion = 0;
        }
    }
};
</script>
