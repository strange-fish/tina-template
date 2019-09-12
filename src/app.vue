<config>
{
  "window": {
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#073a64"
  },
  "pages": [
    "pages/home.vue"
  ]
}
</config>

<script>
import './initDep'

App({
  async onShow () {
    const sysInfo = await wxp.getSystemInfo()
    console.log(sysInfo)
  }
})
</script>
