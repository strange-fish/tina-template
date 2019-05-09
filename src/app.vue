<config>
{
  "window": {
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#073a64"
  },
  "pages": [
    "./pages/test.vue",
    "./pages/test2.vue"
  ]
}
</config>

<script lang="ts">
import { appify, MyApp, MyStore } from './base/index'

@appify(new MyStore(), { pages: [], tabBarList: [] })
class NewApp extends MyApp {

}

export default NewApp
</script>
