import 'package:flutter/material.dart';
import 'package:flutter_cpu/screens/aux_screen.dart';


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.dark(),
        scaffoldBackgroundColor: const Color(0xFF232324),
      ),
      home: const AuxScreen()
    );
  }
}

