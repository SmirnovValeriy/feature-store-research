<template>
    <div class="rowrow">
        <div>
            <ul/>
            <div class = rowrow2 style = "display: flex;">
                <div>
                    <div style="width: 30%; display: flex">
                        <div class="subheader_bold"> Feature: </div> <div class = "subheader"> {{name}} </div>
                        <div v-if="pvalue_dist < 0.2">
                            <b-icon :id="name" icon="exclamation-circle-fill" variant="danger"/>
                            <b-popover :target="name" triggers="hover" variant = "danger" placement="rightbottom">
                                This feature is <b>unstable</b> and should rather be removed!
                            </b-popover>
                        </div>

                    </div>
                    <div class = "mb-4" style = "text-align: center; font-size: 20px">
                        <b-avatar v-if="pvalue_dist < 0.2" variant = danger :text="round2(pvalue_dist).toString()"  size = "8rem"></b-avatar>
                        <b-avatar v-if="pvalue_dist >= 0.2 && pvalue_dist < 0.6"
                                  variant = warning :text="round2(pvalue_dist).toString()"  size = "8rem"></b-avatar>
                        <b-avatar v-if="pvalue_dist >= 0.6" variant = success :text="round2(pvalue_dist).toString()"  size = "8rem"></b-avatar>
                    </div>
                    <div style = "display: flex">
                        <div class="pvalues_header_bold">
                            Month distribution stability:
                        </div>
                        <div class="pvalues_header">
                            {{round2(pvalue_dist)}}
                        </div>
                    </div>
                    <div style = "display: flex">
                        <div class="pvalues_header_bold">
                            Event rate stability:
                        </div>
                        <div class="pvalues_header">
                            {{round2(pvalue_er)}}
                        </div>
                    </div>
                </div>
                <div style = "width: 30%; margin-left: auto; text-align: center">
                    <div class = "pvalues_header_bold">Distribution</div>
                    <chartjs-bar
                                 :data="hist"
                                 :labels="labels"
                                 :bordercolor="'#762a83'"
                                 :backgroundcolor="'#9970ab'"
                                 :option = "bar_options"
                    />
                </div>
                <div style = "width: 30%; margin-left: auto; text-align: center">
                    <div class = "pvalues_header_bold">Monthly distribution</div>
                    <chartjs-bar
                                 :data="months_count"
                                 :labels="months_names.slice(0, months_count.length )"
                                 :bordercolor="'#9970ab'"
                                 :backgroundcolor="'#e7d4e8'"
                                 :option = "bar_options"
                    ></chartjs-bar>
                </div>
            </div>
            <ul/>
            <div class="subheader_bold"> Months distribution stability </div>
            <div v-for="(item, index) in months_hist" v-bind:key = "index"
                 style = "display: inline-block; justify-component: space-between;
                 flex-wrap: nowrap;">
                <div class = "months_names"> {{months_names[index]}} </div>
                <div class = "pvalues" v-if="pvalues_dist[index] > 0.05"> p-value = {{round2(pvalues_dist[index])}} </div>
                <div class ="pvalues" v-else style = "color: red; font-weight: 400"> p-value = {{round2(pvalues_dist[index])}} </div>
                <chartjs-horizontal-bar style = "padding: 20px"
                                        :height=300
                                        :width=130
                                        :data=item
                                        :option="bar_options"
                                        :labels="months_labels"
                                        :bordercolor = "'#1b7837'"
                                        :backgroundcolor = "'#a6dba0'"/>
            </div>
            <div style = "padding: 20px; width: 100%">
                <chartjs-line :height = 80
                              :datasets="datasets"
                              :option="line_options"
                              :labels="months_names.slice(0, datasets[0].data.length).map(d => {return d.toUpperCase()})"/>
            </div>
            <hr>
            <ul/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Feature',
    props: {
        name: {
            type: String,
            default: () => "name"
        },
        hist: {
            type: Array,
            default: () => []
        },
        months_hist: {
            type: Array,
            default: () => []
        },
        months_names: {
            type: Array,
            default: () => []
        },
        pvalue_dist: {
            type: Number,
            default: () => 0.0
        },
        pvalue_er: {
            type: Number,
            default: () => 0.0
        },
        pvalues_dist: {
            type: Array,
            default: () => []
        },
        pvalues_er: {
            type: Array,
            default: () => []
        },
        months_count: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return{
            colors: ['#fc6c85', '#fc94a1', '#ffcccb', '#cdffcc', '#b0f5ab', '#90ef90'],
            palette_gr_pr: ['#40004b',
                      '#762a83',
                      '#9970ab',
                      '#c2a5cf',
                      '#e7d4e8',
                      '#d9f0d3',
                      '#a6dba0',
                      '#5aae61',
                      '#1b7837',
                      '#00441b'],
            palette_rd_bl: [ '#a50026',
                      '#d73027',
                      '#f46d43',
                      '#fdae61',
                      '#fee090',
                      '#ffffbf',
                      '#e0f3f8',
                      '#abd9e9',
                      '#74add1',
                      '#4575b4',
                      '#313695'],
            bar_options: {
                hover: {
                    mode: "index"
                },
                legend: {
                    display: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        display: true,
                        barPercentage: 1.255,
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            drawOnChartArea: false
                        },
                        barPercentage: 1.25
                    }]
                }
            },
            line_options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            fontStyle: "bold",
                            fontSize: 20
                        }
                    }]
                }
            }
        };
    },
    methods: {
        round2(num) {
            return Math.round((num + Number.EPSILON) * 100) / 100;
        },
        getColorPalette(num) {
            if(num < 10) return this.palette_gr_pr[num];
            else if(num < 21) return this.palette_rd_bl[num - 10]
            else return '#ffffff'
        },
        getcolor(num) {
            return this.colors[Math.floor(num * 5)];
        }
    },
    computed: {
        datasets: function() {
            let dataset = [];
            let self = this;
            this.pvalues_er.forEach( function(value, key) {
                dataset.push({ label: key.toString(), data: value, fill: false, borderColor: self.getColorPalette(key) }); })
            console.log(dataset);
            return dataset;
        },
        width: function () { return 100 / this.month_hist.length; },
        labels: function () {
            return Array(this.hist.length).fill(0).map( function(value, key) { return key; } )
        },
        months_labels: function () {
            return Array(this.months_hist[0].length).fill(0).map( function(value, key) { return key; } )
        }
    }
}

</script>
