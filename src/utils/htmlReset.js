export const htmlR = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            background-color: white;
            border-radius: 5px;
            text-align: center;
            padding: 50px;
            font-size: 3rem;
            letter-spacing: 2px;
            font-weight: bold;
            width: 100%;
        }

        .flex {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .vh {
            height: 50vh;
        }

        .black {
            background-color: gray;
        }
    </style>
</head>

<body class="flex vh black">
    <div class="">
        <h6>${otp}</h6>
    </div>
</body>

</html>`

}