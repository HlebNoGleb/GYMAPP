<script lang="ts">
    import { _ } from 'svelte-i18n';
    import ButtonBack from '../../common/buttonBack.svelte';
    import TrainingHistory from '../../../testData/TrainingHistory.json'
</script>

<h1>{$_('trainings.addTitle')}</h1>
<ButtonBack/>

<!--
    Название тренировки
    Выбрать упражнение из стандартных и своих
    Добавить свое упражнение


-->