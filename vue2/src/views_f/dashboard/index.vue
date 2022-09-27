<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <github-corner class="github-corner" />
      <FormilyPage :schema="schema" :components="components" :scope="scope" schema-key="Dashboard" />
    </div>
  </div>
</template>

<script>
import FormilyPage from '@/components/FormilyPage'
import { wrapComponent } from '@/components/FormilyPage/transformComponent'
import page from 'formily/views/dashboard/index'

import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

export default {
  name: 'Dashboard',
  components: { FormilyPage, GithubCorner },
  data() {
    return {
      schema: page.schema,
      components: {
        PanelGroup,
        LineChart,
        RaddarChart: wrapComponent(RaddarChart, 'div', { class: 'chart-wrapper' }),
        PieChart: wrapComponent(PieChart, 'div', { class: 'chart-wrapper' }),
        BarChart: wrapComponent(BarChart, 'div', { class: 'chart-wrapper' }),
        TransactionTable,
        TodoList,
        BoxCard
      },
      scope: {
        PAGE: {
          useQueryChartData() {
            return function(field) {
              const dataSource = [
                {
                  title: 'New Visits',
                  value: 102400,
                  icon: 'peoples',
                  lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                  }
                },
                {
                  title: 'Messages',
                  value: 81212,
                  icon: 'message',
                  lineData: {
                    expectedData: [200, 192, 120, 144, 160, 130, 140],
                    actualData: [180, 160, 151, 106, 145, 150, 130]
                  }
                },
                {
                  title: 'Purchases',
                  value: 9280,
                  icon: 'money',
                  lineData: {
                    expectedData: [80, 100, 121, 104, 105, 90, 100],
                    actualData: [120, 90, 100, 138, 142, 130, 130]
                  }
                },
                {
                  title: 'Shoppings',
                  value: 13600,
                  icon: 'shopping',
                  lineData: {
                    expectedData: [130, 140, 141, 142, 145, 150, 160],
                    actualData: [120, 82, 91, 154, 162, 140, 130]
                  }
                }
              ]
              field.setComponentProps({
                dataSource,
                onHandleSetLineChartData: function({ lineData }) {
                  field.query('.lineChart').take(chartField => {
                    chartField.setComponentProps({
                      chartData: lineData
                    })
                  })
                }
              })
              field.query('.lineChart').take(chartField => {
                chartField.setComponentProps({
                  chartData: dataSource[0] ? dataSource[0].lineData : { expectedData: [], actualData: [] }
                })
              })
            }
          }
        }
      }
    }
  },
  computed: {
  },
  created() {
  }
}
</script>

<style lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
