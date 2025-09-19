import 'package:flutter/material.dart';

class HistoryScreen extends StatefulWidget {
  final String collectorId;

  const HistoryScreen({Key? key, required this.collectorId}) : super(key: key);

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  // Dummy data for demonstration
  final List<Map<String, dynamic>> _collections = [
    {
      'date': '2025-09-18',
      'species': 'Ashwagandha',
      'quantity': 2.5,
      'location': 'Forest Zone A',
      'status': 'Verified',
    },
    {
      'date': '2025-09-17',
      'species': 'Tulsi',
      'quantity': 1.8,
      'location': 'Forest Zone B',
      'status': 'Pending',
    },
    // Add more dummy data as needed
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Collection History',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.green[800],
            ),
          ),
          SizedBox(height: 16),
          Expanded(
            child: ListView.builder(
              itemCount: _collections.length,
              itemBuilder: (context, index) {
                final collection = _collections[index];
                return Card(
                  margin: EdgeInsets.only(bottom: 12),
                  child: ListTile(
                    contentPadding: EdgeInsets.all(16),
                    title: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          collection['species'],
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: collection['status'] == 'Verified'
                                ? Colors.green[100]
                                : Colors.orange[100],
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            collection['status'],
                            style: TextStyle(
                              color: collection['status'] == 'Verified'
                                  ? Colors.green[800]
                                  : Colors.orange[800],
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 8),
                        Row(
                          children: [
                            Icon(
                              Icons.calendar_today,
                              size: 16,
                              color: Colors.grey,
                            ),
                            SizedBox(width: 8),
                            Text(collection['date']),
                          ],
                        ),
                        SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(Icons.scale, size: 16, color: Colors.grey),
                            SizedBox(width: 8),
                            Text('${collection['quantity']} kg'),
                          ],
                        ),
                        SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(
                              Icons.location_on,
                              size: 16,
                              color: Colors.grey,
                            ),
                            SizedBox(width: 8),
                            Text(collection['location']),
                          ],
                        ),
                      ],
                    ),
                    onTap: () {
                      // TODO: Show collection details
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
