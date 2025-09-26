import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

const String ipAPI = '192.168.1.191';
const int porta = 3000;

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: const HomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final http.Client _client = http.Client();

  Future<void> fetchData(int tamanhoKB) async {
    final url = Uri.parse('http://$ipAPI:$porta/data/$tamanhoKB');

    try {
      final stopwatch = Stopwatch()..start();
      final response = await _client.get(url);
      stopwatch.stop();

      final data = json.decode(response.body);

      debugPrint('=== Requisição $tamanhoKB KB ===');
      debugPrint(
        'Tempo de resposta (apenas GET): ${stopwatch.elapsedMilliseconds} ms',
      );
      debugPrint('Tamanho da string: ${data['data'].length} chars');
      debugPrint('------------------------------------');
    } catch (e) {
      debugPrint('Erro: $e');
    }
  }

  Widget buildButton(String text, int tamanhoKB) {
    return SizedBox(
      width: 220,
      child: ElevatedButton(
        onPressed: () => fetchData(tamanhoKB),
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF1E88E5),
          padding: const EdgeInsets.symmetric(vertical: 15),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),
        child: Text(
          text,
          style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _client.close(); // Fechar o client quando fechar o app
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF232324),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            spacing: 21,
            children: [
              const Text(
                'Escolha o tamanho do JSON retornado pela API',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
              buildButton('1 KB', 1),
              buildButton('10 KB', 10),
              buildButton('100 KB', 100),
            ],
          ),
        ),
      ),
    );
  }
}
