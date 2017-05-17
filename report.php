<?php
/**
 * Rafael Armenio <rafael.armenio@gmail.com>
 *
 * @link http://github.com/armenio for more information
 */

if (PHP_SAPI != "cli") {
    die('Este recurso está disponível apenas em modo cli.<br/>Execute o comando "$ php /caminho/do/arquivo/report.php seu_username seu_password" para usá-lo.');
}

if (!isset($_SERVER['argv'][1])) {
    die('Nome de usuário inválido.' . PHP_EOL);
}

if (!isset($_SERVER['argv'][2])) {
    die('Senha inválida.' . PHP_EOL);
}

/**
 * @todo configurar
 */
$baseUrl = 'http://localhost:8000/api';

$ch = curl_init($baseUrl . '/login_check');

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    'username' => $_SERVER['argv'][1],
    'password' => $_SERVER['argv'][2],
]);
$result = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

if ($code == 200 && stripos($result, '"token":"') !== false) {
    $arr = json_decode($result, true);

    if (!empty($arr['token'])) {
        $ch = curl_init($baseUrl . '/products/report');

        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer {$arr['token']}"]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if ($code == 204) {
            die('Relatório enviado com sucesso!' . PHP_EOL);
        } else {
            die('Não foi possível enviar o relatório.' . PHP_EOL);
        }
    }
} else {
    die('Usuário e/ou senha inválidos.' . PHP_EOL);
}