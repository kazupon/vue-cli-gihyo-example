import Vue from 'vue'
import Hello from 'src/components/Hello'

describe('Helloコンポーネント', () => {
  it('デフォルトメッセージが正しく描画されていること', () => {
    const Ctor = Vue.extend(Hello)
    const vm = new Ctor().$mount()
    expect(vm.$el.textContent).to.equal('メッセージ: こんにちは！')
  })

  it('msgプロパティで指定した文字列値で正しく描画されていること', () => {
    const Ctor = Vue.extend(Hello)
    // 初期プロパティ値の変更は、propsData経由で行う
    // 公式ドキュメントを参照: https://jp.vuejs.org/v2/api/#propsData
    const vm = new Ctor({ propsData: { msg: 'ようこそ！' } }).$mount()
    expect(vm.$el.textContent).to.equal('メッセージ: ようこそ！')
  })

  it('親コンポーネント経由でmsgプロパティに指定された文字列で正しく描画されていること', done => {
    const vm = new Vue({
      data: { message: '' },
      components: { Hello },
      // render関数で実装されている内容は
      // templateオプションに'<hello :msg="message"></hello>'に指定するのと同義
      render (h) { return h('hello', { props: { msg: this.message } }) }
    }).$mount()
    // マウント後、コンポーネントの状態値(props/data)の変更に対するDOMの更新検証は、
    // 非同期に更新されるため、Vue.nextTickを使用する
    vm.message = 'ようこそ！'
    Vue.nextTick(() => {
      expect(vm.$el.textContent).to.equal('メッセージ: ようこそ！')
      done()
    })
  })
})
