<template>
    <div class="Login">
        <div class="Login-head">
            <h1>Авторизация</h1>
        </div>
        <div class="Login-body">
            <img src="../assets/AishaVar2.png" class="login__image" alt="gos24.kz"/>
            <form @submit.prevent="login" class="login-content">
                <div v-if="error" class="form-Content-text">
                    <div v-if="error === 'email_not_confirmed'">
                        <h3>Ваш email адрес не подтвержден!</h3>
                        <p>Найдите письмо во входящих от sendbox@gos24.kz и подтвердите email.</p>
                        <hr>
                        <p class="mb-0">Если Вы не нашли письмо, напишите нам на <a href="mailto:help@gos24.kz">help@gos24.kz</a>
                        </p>
                    </div>

                    <div v-if="error === 'wrong_email_or_password'">
                        <h3>Неправильный email или пароль!</h3>
                        <hr>
                        <p class="mb-0">Если Вы забыли пароль, перейдите по ссылке
                            <a
                              href="#" @click="openLink('https://gos24.kz/user/forgot')" style="text-decoration: underline; cursor: pointer">Восстановить пароль.</a>
                        </p>
                    </div>
                </div>
                <Input label="Email" :value="email" nameProp="email" @get="selectedValue" type="email"
                       required="required"/>
                <Input label="Пароль" :value="password" nameProp="password" @get="selectedValue" type="password"
                       required="required"/>
                <div class="footer">
                    <Button type="submit" text="Войти" :disabled="disabled"/>
                    <Loading class="small" v-if="disabled"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Input from '../components/ui/Input.vue'
    import Loading from '../components/ui/Loading.vue'
    import Button from '../components/ui/Button.vue'
    import {mapMutations} from 'vuex';

    export default {
        name: 'Login',
        components: {
            Input,
            Loading,
            Button
        },
        data () {
            return {
                password: '',
                email: '',
                error: '',
                disabled: false
            }
        },
        methods: {
            ...mapMutations({
                setUser: 'SET_USER',
                setAccesToken: 'STORE_ACCESS_TOKEN',
                setRefreshToken: 'STORE_REFRESH_TOKEN'
            }),
            openLink (link) {
                this.$electron.shell.openExternal(link)
            },
            selectedValue (val) {
                this[val.name] = val.value
            },
            async login () {
                try {
                    this.disabled = true;
                    this.error = '';
                    const username = this.email.toLowerCase();
                    const password = this.password;
                    const {data} = await this.$axios.post('/user/authenticate/', {username, password});
                    this.setUser(data.user);
                    this.setAccesToken(data.accessToken);
                    this.setRefreshToken(data.refreshToken);
                    await this.$electron.ipcRenderer.send('update-user', data);
                    await this.$electron.ipcRenderer.send('show-logout-btn', true);
                    await this.$electron.remote.getCurrentWindow().close();
                } catch (err) {
                    console.log('error 1', err);
                    this.error = err.response.data.error;
                } finally {
                    this.disabled = false;
                }
            }
        }
    }
</script>

<style scoped>
    .Login {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .Login-body {

    }

    .Login-body form > div {
        margin-bottom: 1rem;
    }

    .Login-body img {
        width: 100%;
        max-height: 300px;
        object-fit: contain;
        margin: 1rem 0;
    }
</style>
