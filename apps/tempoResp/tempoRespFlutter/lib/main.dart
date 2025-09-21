import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: CounterPage(),
    );
  }
}

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _counter = 0;

  void _incrementCounter() {
    final stopwatch = Stopwatch()..start();

    setState(() {
      _counter++;
    });

    stopwatch.stop();
    final inputLag = stopwatch.elapsedMicroseconds / 1000; //converter para ms
    debugPrint("Latência de entrada: ${inputLag.toStringAsFixed(2)} ms");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF232324),
      body: Center(
        child: Text(
          "$_counter",
          style: const TextStyle(
            color: Color(0xFF1E88E5),
            fontSize: 45,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        backgroundColor: const Color(0xFF1E88E5),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}
